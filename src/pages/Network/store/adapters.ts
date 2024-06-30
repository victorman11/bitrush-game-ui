import { ApiResponse } from '../types'

function getLevelAndValue(name: string) {
  // Expressão regular para encontrar o número no final da string
  const regex = /(\d+)$/
  const match = name.match(regex)

  if (match) {
    const number = match[1]
    const word = name.replace(number, '')

    return {
      label: `${word} ${number}`,
      value: Number(number),
    }
  } else {
    return {
      label: 'Level 0',
      value: 0,
    }
  }
}

export function networkInfoAdapter(data: ApiResponse.NetworkInfo) {
  return {
    rank: {
      minAffiliates: data.rank.minAffiliates,
      name: data.rank.name,
      level: getLevelAndValue(data.rank.name),
    },
    nextRank: data.nextRank
      ? {
          minAffiliates: data.nextRank.minAffiliates,
          name: data.nextRank.name,
          level: getLevelAndValue(data.nextRank.name),
        }
      : null,
    totalAffiliates: data.totalAffiliates,
    totalRevenue: data.totalRevenue,
    directAffiliates: data.directAffiliates,
    directAffiliatesNetwork: data.directAffiliatesNetwork,
  }
}
