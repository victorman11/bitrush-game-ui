import { z } from 'zod'

export const sendMessageSchema = z.object({
  message: z
    .string()
    .refine(
      (value) => value.trim().length > 0 && value.trim().length < 500,
      {},
    ),
})
export type SendMessageData = z.infer<typeof sendMessageSchema>
