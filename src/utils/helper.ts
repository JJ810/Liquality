export const formatNumber = (number: number): string => ('0' + number).slice(-2)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${formatNumber(date.getMonth() + 1)}/${formatNumber(
    date.getDate()
  )}/${date.getFullYear()} ${formatNumber(date.getHours())}:${formatNumber(
    date.getMinutes()
  )}:${formatNumber(date.getSeconds())}`
}

export const formatEntry = (value: number, from: string): string => {
  let denoted = 0
  if (from === 'BTC') denoted = value / 100000000
  else if (from === 'ETH') denoted = value / 1000000000
  else if (from === 'DAI') denoted = value / 1000000000 / 1000000000
  else denoted = value
  return `${denoted} ${from}`
}
