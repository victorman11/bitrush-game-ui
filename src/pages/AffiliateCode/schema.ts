import { z } from 'zod'

export const affiliateSchema = z.object({
  affiliateCode: z
    .string()
    .min(8, 'Affiliate code must contain at least 8 characters'),
})
export type AffiliateData = z.infer<typeof affiliateSchema>
