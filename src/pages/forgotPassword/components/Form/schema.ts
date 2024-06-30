import { z } from 'zod'

export const resetPasswordFirstStepSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Username is required',
    })
    .email('Invalid email')
    .toLowerCase(),
})
export type ResetPasswordFirstStepData = z.infer<
  typeof resetPasswordFirstStepSchema
>
