import { z } from 'zod'

export const depositSchema = z.object({
  rush: z.string().min(0, {
    message: 'Rush is required',
  }),
})
export type DepositData = z.infer<typeof depositSchema>
