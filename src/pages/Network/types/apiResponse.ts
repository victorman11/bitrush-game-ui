import BigNumber from 'bignumber.js'

type NetworkInfo = {
  rank: {
    minAffiliates: number
    name: string
  }
  nextRank?: {
    minAffiliates: number
    name: string
  }
  totalAffiliates: number
  totalRevenue: number
  directAffiliates: number
  directAffiliatesNetwork: number
}

type Affiliate = {
  name: string
  id: number
  profit: BigNumber
  affiliates: number
}

type GetNetworkResponseType = {
  data: NetworkInfo
}

type GetAffiliateResponseType = {
  data: Affiliate[]
}

export type { GetNetworkResponseType, GetAffiliateResponseType, NetworkInfo }
