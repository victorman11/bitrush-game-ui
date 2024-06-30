export enum ServerEvents {
  ADD_USER_BITS = 'addUserBits',
  BET_ALLOWED = 'betAllowed',
  CONNECT = 'connect',
  CONNECT_ERROR = 'connect_error',
  CONNECT_FAILED = 'connect_failed',
  DISCONNECT = 'disconnect',
  END_GAME = 'endGame',
  EXCEPTION = 'exception',
  GAME_STATUS_CHANGED = 'gameStatus',
  GAME_COUNTDOWN_CHANGED = 'gameCountdownChanged',
  //  HISTORY = "history",
  GAME_BUST_CHANGED = 'gameBustChanged',
  GAME_FINAL_BUST = 'gameFinalBust',
  //  RECONNECT = "reconnect",
  REFRESH_USER_DATA = 'refreshUserData',
  BET_FINISHED = 'betFinished',
  USERS_WITH_BETS = 'users',
  CHAT_MESSAGE = 'chatMessage',
  JOINED_CHAT_ROOM = 'joinedChatRoom',
  LEAVE_CHAT_ROOM = 'leaveChatRoom',
  USER_GAME_BET = 'userGameBet',
  FEES = 'fees',
}

export enum ClientEvents {
  SEND_MESSAGE_TO_CHAT_ROOM = 'sendMessageToChatRoom',
  USER_BET = 'userBet',
  JOIN_CHAT_ROOM = 'joinChatRoom',
  USER_BET_CANCEL = 'userBetCancel',
  LOGIN = 'login',
  LOGOUT = 'logout',
  USER_BET_STOP = 'userBetStop',
  JOIN_GAME_ROOM = 'joinGameRoom',
}
export const GAME_ROOM = 'gameRoom'

export default ServerEvents
