export const formatNumber = (number: number): string => ('0' + number).slice(-2)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${formatNumber(date.getMonth() + 1)}/${formatNumber(date.getDate())}/${date.getFullYear()} ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`
}
