import { z } from 'zod'

export const signInSchema = z.object({
  userName: z.string().min(1, {
    message: 'Username is required',
  }),
  password: z.string().min(1, {
    message: 'Password required',
  }),
})
export type SignInData = z.infer<typeof signInSchema>
