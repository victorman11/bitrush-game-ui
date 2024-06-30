import { z } from 'zod'

export const signInSchema = z.object({
  userName: z
    .string()
    .min(1, {
      message: 'Username is required',
    })
    .toLowerCase(),
  password: z
    .string()
    .min(1, {
      message: 'Password required',
    })
    .toLowerCase(),
})
export type SignInData = z.infer<typeof signInSchema>
