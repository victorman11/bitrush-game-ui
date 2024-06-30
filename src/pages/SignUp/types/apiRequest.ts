type SignUpRequestType = {
  userName: string
  password: string
  email: string
  birth: string
  country: string
  affiliateCode: string
}

type ValidateCodeRequestType = {
  email: string
  token: string
}

type CodeRequestType = {
  email: string
  userName: string
}

export type { SignUpRequestType, ValidateCodeRequestType, CodeRequestType }
