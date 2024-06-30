export function getChartMobileRatio() {
  if (window.innerHeight <= 680) {
    return 20 / 100
  }

  if (window.innerHeight <= 780) {
    return 27 / 100
  }

  if (window.innerHeight <= 812) {
    return 27 / 100
  }

  if (window.innerHeight <= 844) {
    return 27 / 100
  }

  if (window.innerHeight <= 896) {
    return 27 / 100
  }

  if (window.innerHeight <= 932) {
    return 27 / 100
  }

  return 20 / 100
}

export function getChartDesktopRatio() {
  return 28 / 100
}
