import { z } from 'zod'

import { passwordRegex } from '@/helpers/regex'

export const passwordSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password required',
    }),
    newPassword: z.string(),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords don't match",
    path: ['confirmNewPassword'],
  })
  .refine((data) => data.newPassword && !passwordRegex.test(data.newPassword), {
    message: 'Invalid format',
    path: ['newPassword'],
  })

export type PasswordSchema = z.infer<typeof passwordSchema>
