import { z } from 'zod'

import { passwordRegex } from '@/helpers/regex'

export const resetPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => !passwordRegex.test(data.password), {
    path: ['password'],
    message: 'Invalid format',
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  })
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
