import z from 'zod'

const variables = {
  ALLOWED_CHATROOMS: import.meta.env.VITE_ALLOWED_CHATROOMS.split(',') ?? [
    'EN',
  ],
  API_URL: import.meta.env.VITE_API_URL,
  APP_DOMAIN: import.meta.env.VITE_APP_DOMAIN ?? 'https://test.crashouse.com',
  BTC_TO_BITS: parseFloat(import.meta.env.VITE_BTC_TO_BITS),
  MIN_WITHDRAWAL_VALUE_IN_RUSH: parseFloat(
    import.meta.env.VITE_MIN_WITHDRAWAL_VALUE_IN_RUSH,
  ),
  WEBSOCKET_URL: import.meta.env.VITE_WEBSOCKETS_URL,
  WITHDRAW_COMMISSION: parseFloat(
    import.meta.env.VITE_WITHDRAWAL_COMMISSION ?? '0.1',
  ),
  IS_PROD: import.meta.env.VITE_ENV === 'prod',
}

const envSchema = z.object({
  ALLOWED_CHATROOMS: z.array(z.string()),
  API_URL: z.string(),
  APP_DOMAIN: z.string(),
  BTC_TO_BITS: z.number(),
  MIN_WITHDRAWAL_VALUE_IN_RUSH: z.number(),
  WEBSOCKET_URL: z.string(),
  WITHDRAW_COMMISSION: z.number(),
  IS_PROD: z.boolean(),
})

const envVariables = envSchema.parse(variables)

export default envVariables
