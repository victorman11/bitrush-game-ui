/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'react-toastify'
import io from 'socket.io-client'

import { QueryKeys } from '@/commons/consts'
import envVariables from '@/commons/consts/envVariables'
import ServerEvents, {
  ClientEvents,
  GAME_ROOM,
} from '@/commons/consts/socketKeys'
import { useAuthStore, useWSGameStore } from '@/commons/stores'
import { useDepositStore } from '@/commons/stores/depositStore.ts'
import { useWSBetStore } from '@/commons/stores/useWSBetStore'
import { WSBetType } from '@/commons/types/websocket'
import { DEPOSITS_PAGE_SIZE } from '@/components/LastDepositsTable/useLastDepositsTable.ts'
import { queryClient } from '@/components/Providers/Providers'
import { getDeposit } from '@/pages/Cashier/store/actions.ts'
import { useWithdrawalSocketStore } from '@/pages/CashierV2/components/withdrawal/store/useWithdrawalSocketStore'
import { useChatroomStore } from '@/pages/Home/components/Chatroom/useChatroomStore.ts'
import ApiService from '@/services/api.ts'
import * as Cookies from '@/services/cookieStorage'

import {
  GameEndEventData,
  GameStatusChangedEventData,
  OnChatMessageData,
} from './socketTypes'

const webSocketsUrl = envVariables.WEBSOCKET_URL

let socket: any = null
//
// export const getWebSocket = () => {
//   return socket;
// };

export const wsEmit = (eventName: string, data?: any): void => {
  if (!socket) return
  socket.emit(eventName, data)
}

export const disconnectWebSocket = () => {
  if (socket?.connected) {
    socket.disconnect()
  }
}

export const createWebSocketConnection = (autoConnect = true) => {
  const {
    resetGame,
    setChartDataSet,
    setGameCurrentMultiplier,
    setCountdown,
    setGameResults,
    setGameStatus,
    setLastGameResult,
    setCurrentUserPayout,
  } = useWSGameStore.getState()

  const {
    resetBets,
    setBets,
    setBetDone,
    setBetAllowed,
    setUserBet,
    setUserBetStatus,
  } = useWSBetStore.getState()

  const { room } = useChatroomStore.getState()

  if (socket?.connected) {
    socket.disconnect()
  }

  const url = `${webSocketsUrl}`
  socket = io(url, {
    autoConnect,
    reconnection: true,
    reconnectionAttempts: 99999,
  })

  return new Promise((resolve) => {
    socket.on(ServerEvents.CONNECT, () => {
      console.log('wsconnected', url)

      const accessToken = Cookies.getToken()
      if (accessToken) {
        wsEmit(ClientEvents.LOGIN, accessToken)
      }
      wsEmit(ClientEvents.JOIN_GAME_ROOM, GAME_ROOM)
      wsEmit(ClientEvents.JOIN_CHAT_ROOM, room)

      resolve(socket)
    })

    socket.on(
      ServerEvents.GAME_BUST_CHANGED,
      (data: { position: number; bust: number }) => {
        setChartDataSet([data.position, data.bust])
      },
    )

    socket.on(ServerEvents.GAME_FINAL_BUST, (bust: number) => {
      setUserBetStatus('betEmpty')
      setGameCurrentMultiplier(bust)
    })

    socket.on(ServerEvents.GAME_COUNTDOWN_CHANGED, (countdown: number) => {
      if (countdown === 0) {
        setGameCurrentMultiplier(-1)
        setCountdown(-1)
        return
      }
      setCountdown(countdown)
    })

    socket.on(ServerEvents.END_GAME, (data: GameEndEventData) => {
      console.log({ data })
      setGameResults(data)
      setCurrentUserPayout(null)

      if (data && data.win) {
        setLastGameResult('win')
      }

      if (data && data.win === false) {
        setLastGameResult('lose')
      }
    })

    socket.on(
      ServerEvents.GAME_STATUS_CHANGED,
      (data: GameStatusChangedEventData) => {
        console.log(`listen to GameStatus`, data)
        setGameStatus(data)
        if (data === 'starting') {
          setGameResults(null)
        }
        if (data === 'finished') {
          queryClient.refetchQueries({
            queryKey: [QueryKeys.GET_USER_GAME_HISTORY],
          })
          setUserBet(null)
        }
      },
    )

    socket.on(ServerEvents.REFRESH_USER_DATA, async () => {
      console.log(`listen to refreshUserData`)
      await queryClient.refetchQueries({ queryKey: [QueryKeys.GET_ME] })
    })

    socket.on(ServerEvents.USER_GAME_BET, (data: { payout: number }) => {
      setCurrentUserPayout(data.payout)
    })

    socket.on(ServerEvents.USERS_WITH_BETS, (data: any) => {
      setBets(data as WSBetType[])
    })

    socket.on(ServerEvents.BET_ALLOWED, (data: any) => {
      const { userBetStatus } = useWSBetStore.getState()
      if (!data && userBetStatus === 'betDone') {
        setUserBetStatus('betInProgress')
      }

      if (data) {
        resetGame()
        resetBets()
        setBetDone(false)
      }
      setBetAllowed(data)
    })

    // socket.on(SocketKeys.CLIENTS_CONNECT, (data: any) => {
    //   console.log(`listen to clientsConnected`, data);
    // });

    // socket.on(ServerEvents.HISTORY, () => {
    //   // console.log(`listen to history`, data);
    // });

    socket.on(ServerEvents.ADD_USER_BITS, async (data: any) => {
      console.log(`listen to addUserBits`, data)
      await queryClient.refetchQueries({ queryKey: [QueryKeys.GET_ME] })
      const { deposits } = useDepositStore()
      await getDeposit(
        (deposits.length > DEPOSITS_PAGE_SIZE
          ? deposits.length
          : DEPOSITS_PAGE_SIZE) + 1,
        0,
      )
      toast.success('New deposit')
    })

    socket.on(ServerEvents.BET_FINISHED, () => {
      console.log(`listen to`, ServerEvents.BET_FINISHED)
      setUserBet(null)
    })

    socket.on(ServerEvents.CHAT_MESSAGE, (data: OnChatMessageData) => {
      console.log('CHAT_MESSAGE =>', data)
      const state = useChatroomStore.getState()
      const user = useAuthStore.getState().user
      if (state.room === data.room) {
        state.addMessage({
          id: data.id,
          createdAt: new Date(data.createdAt),
          userName: data.userName,
          text: data.message,
          userId: data.userId,
        })
        if (data.message.includes(`@${user?.userName}`)) {
          toast.info(`You were mentioned by @${data.userName}`)
        }
      }
    })

    socket.on(ServerEvents.JOINED_CHAT_ROOM, (data: any) => {
      const state = useChatroomStore.getState()
      const messages = data.reduce((acc: any, m: any) => {
        if (state.room === m.room) {
          acc.push({
            id: m.id,
            createdAt: new Date(m.createdAt),
            userName: m.userName,
            userId: m.userId,
            text: m.message,
          })
        }
        return acc
      }, [])
      state.setMessages(messages)
    })

    socket.on(ServerEvents.FEES, (data: any) => {
      const state = useWithdrawalSocketStore.getState()
      state.setFees(data)
    })

    socket.on(
      ServerEvents.EXCEPTION,
      async function socketOnException(data: any) {
        if (data === 'tokenExpired' && !ApiService.isRefreshingToken()) {
          // get any endpoint to refresh the token
          await new ApiService().get('/users/me')
        }
      },
    )

    socket.on(ServerEvents.CONNECT_ERROR, (err: any) =>
      console.log('connect_error', err),
    )

    socket.on(ServerEvents.CONNECT_FAILED, (err: any) =>
      console.log('connect_failed', err),
    )

    socket.on(ServerEvents.DISCONNECT, () => {
      console.log('wsDisconnect')
    })
  })
}
