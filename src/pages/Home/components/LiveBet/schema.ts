import { z } from 'zod'

import { useAuthStore } from '@/commons/stores'

export const betSchema = z.object({
  bet: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value) && value >= 1, {
      message: 'Bet amount should be at least 1 RUSH',
    })
    .refine((value) => value % 1 === 0, {
      message: 'Bet amount is not a valid integer',
    })
    .refine(
      (value) => {
        const user = useAuthStore.getState().user
        return user && value <= user.bits
      },
      {
        message: 'Insufficient balance',
      },
    ),
  payout: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value) && value >= 1.01, {
      message: 'Payout should be at least 1.01',
    }),
})
export type BetData = z.infer<typeof betSchema>
