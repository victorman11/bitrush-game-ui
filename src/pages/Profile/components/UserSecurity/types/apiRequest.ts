type DeleteAccountRequestType = {
  password: string
}

type UpdatePasswordRequestType = {
  password: string
  newPassword: string
}

type UpdateEmailRequestType = {
  password: string
  email: string
  newEmail: string
}

export type {
  DeleteAccountRequestType,
  UpdatePasswordRequestType,
  UpdateEmailRequestType,
}
