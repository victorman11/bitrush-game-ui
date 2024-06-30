import { z } from 'zod'

export const countryDisclaimerSchema = z.object({
  countryDisclaimer: z.boolean().refine((value) => value, {
    message: 'First you need to agree with Country Disclaimer',
  }),
})

export type CountryDisclaimerData = z.infer<typeof countryDisclaimerSchema>
