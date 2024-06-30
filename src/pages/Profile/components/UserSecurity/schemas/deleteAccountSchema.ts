import { z } from 'zod'

export const deleteAccountSchema = z.object({
  password: z.string().min(8, {
    message: 'Password required',
  }),
})

export type DeleteSchema = z.infer<typeof deleteAccountSchema>
