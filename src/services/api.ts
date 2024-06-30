import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'

import envVariables from '@/commons/consts/envVariables'
import { ClientEvents } from '@/commons/consts/socketKeys.ts'
import { useAuthStore } from '@/commons/stores'
import * as Cookies from '@/services/cookieStorage'

import { wsEmit } from './socket'

const apiUrl = envVariables.API_URL

type RefreshTokenType = {
  data: {
    accessToken: string
    refreshToken: string
  }
}

interface ApiLibrary {
  get<T>(url: string): Promise<T>
  post<T, U>(url: string, payload: T): Promise<U>
}

class ApiService implements ApiLibrary {
  private axiosInstance: AxiosInstance
  private static refreshingToken = false
  private logout = useAuthStore.getState().logOut

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
    })

    this.setupInterceptors()
  }

  static isRefreshingToken() {
    return ApiService.refreshingToken
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (config.url?.includes('/refresh-token')) {
          const refreshToken = Cookies.getRefreshToken()
          config.headers.Authorization = `Bearer ${refreshToken}`
          return config
        }

        const accessToken = Cookies.getToken()
        if (config.headers && accessToken) {
          config.headers['Content-Type'] = 'application/json'
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config

        if (originalRequest?.url?.includes('/auth/refresh-token')) {
          return Promise.reject(error)
        }

        if (
          error.response?.status === 401 &&
          originalRequest &&
          Cookies.getToken()
        ) {
          // If several requests come, they will wait for the token to be refreshed to retry the request
          if (ApiService.refreshingToken) {
            return new Promise((resolve) => {
              const interval = setInterval(() => {
                if (!ApiService.refreshingToken) {
                  clearInterval(interval)
                  const token = Cookies.getToken()
                  if (token) {
                    resolve(this.axiosInstance(originalRequest))
                  } else {
                    resolve(Promise.reject(error))
                  }
                }
              }, 100)
            })
          }

          try {
            ApiService.refreshingToken = true

            const { data } = await this.post<null, RefreshTokenType>(
              '/auth/refresh-token',
              null,
            )

            console.log('Starting refreshToken: ', {
              path: originalRequest.url,
            })

            if (!data || !data.accessToken || !data.refreshToken) {
              throw new Error('No data found on refresh token')
            }

            const { accessToken, refreshToken } = data
            Cookies.storeToken(accessToken, refreshToken)

            wsEmit(ClientEvents.LOGIN, accessToken)

            return this.axiosInstance(originalRequest)
          } catch (erro) {
            Cookies.clearTokens()
            wsEmit(ClientEvents.LOGOUT)
            this.logout()
            return Promise.reject(error)
          } finally {
            ApiService.refreshingToken = false
          }
        }
        return Promise.reject(error)
      },
    )
  }

  async get<T>(path: string): Promise<T> {
    const reponse = await this.axiosInstance(path, {
      method: 'get',
    })

    return reponse.data as T
  }

  async post<T, U>(path: string, data?: T): Promise<U> {
    const response = await this.axiosInstance(path, {
      method: 'post',
      data,
    })

    return response.data
  }

  async patch<T, U>(path: string, data?: T): Promise<U> {
    const response = await this.axiosInstance(path, {
      method: 'patch',
      data,
    })

    return response.data
  }
}

export default ApiService
