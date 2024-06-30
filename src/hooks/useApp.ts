import { useEffect } from 'react'

import {
  createWebSocketConnection,
  disconnectWebSocket,
} from '@/services/socket.ts'

const useApp = () => {
  if (navigator.userAgent.indexOf('iPhone') > -1) {
    document
      .querySelector('[name=viewport]')
      ?.setAttribute(
        'content',
        'width=device-width, initial-scale=1, maximum-scale=1',
      )
  }

  useEffect(() => {
    createWebSocketConnection()
    return () => {
      disconnectWebSocket()
    }
  }, [])
}

export default useApp
