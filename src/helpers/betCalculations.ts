function calcTargetProfit(bet: number, payout: number) {
  if (bet === 0 || payout === 0) {
    return 0
  }

  const allProfit = payout * bet
  const betProfit = allProfit - bet
  const profit = bet + betProfit * 0.9

  const profitFixed = isNaN(profit) ? '-' : profit.toFixed(2)

  return profitFixed
}

function calcWinRate(payout: number) {
  const minInputedValue = 1.01
  const maxPayoutPercentage = 99 // 99percent

  if (!payout) {
    return 0
  }

  if (payout < minInputedValue) {
    return 0
  }

  const value = (99 / payout).toFixed(1)
  return Number(value) > maxPayoutPercentage ? maxPayoutPercentage : value
}

export { calcTargetProfit, calcWinRate }
