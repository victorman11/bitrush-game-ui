import { z } from 'zod'

import envVariables from '@/commons/consts/envVariables.ts'

export const withdrawSchema = z.object({
  address: z
    .string()
    .refine(
      (btcAddress) =>
        /^(bc1|tb1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(btcAddress),
      {
        message: 'Invalid Bitcoin address',
      },
    ),
  rush: z.string().refine(
    (value) => {
      const numValue = parseFloat(value)
      return (
        !isNaN(numValue) &&
        numValue >= envVariables.MIN_WITHDRAWAL_VALUE_IN_RUSH
      )
    },
    {
      message: `Minimum rush amount is ${envVariables.MIN_WITHDRAWAL_VALUE_IN_RUSH}`,
    },
  ),
  password: z.string().min(1, {
    message: 'Password required',
  }),
})
export type WithdrawData = z.infer<typeof withdrawSchema>
