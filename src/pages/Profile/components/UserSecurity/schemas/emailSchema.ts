import { z } from 'zod'

export const emailSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email({
        message: 'Invalid email format',
      })
      .toLowerCase(),
    newEmail: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email({
        message: 'Invalid email format',
      })
      .toLowerCase(),
    password: z.string().min(8, {
      message: 'Password required',
    }),
  })
  .refine((data) => data.email === data.newEmail, {
    message: 'Email address must differ from the existing one',
    path: ['newEmail'],
  })

export type EmailSchema = z.infer<typeof emailSchema>
