export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
