import { z } from 'zod'

export const withdrawSchema = z.object({
  address: z.string().min(1, {
    message: 'Adress required',
  }),
  amount: z.string().min(0, {
    message: 'Amount is required',
  }),
  password: z.string().min(1, {
    message: 'Password required',
  }),
})

export const mainWithdrawSchema = z.object({
  main_address: z
    .string()
    .min(1, {
      message: 'Address required',
    })
    .refine((address) => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address), {
      message: 'Invalid solana address',
    }),
  main_amount: z.string().min(0, {
    message: 'Amount is required',
  }),
  main_password: z.string().min(1, {
    message: 'Password required',
  }),
})

export type WithdrawData = z.infer<typeof withdrawSchema>
export type MainWithdrawData = z.infer<typeof mainWithdrawSchema>
