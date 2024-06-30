import { z } from 'zod'

export const leaderboardSchema = z.object({
  filter: z.number(),
})
export type LeaderboardFilter = z.infer<typeof leaderboardSchema>
