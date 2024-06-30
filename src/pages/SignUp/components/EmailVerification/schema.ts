import { z } from 'zod'

export const emailCodeSchema = z.object({
  emailCode: z
    .string()
    .min(1, {
      message: 'Code is required',
    })
    .toLowerCase(),
})

export type EmailCodeData = z.infer<typeof emailCodeSchema>
