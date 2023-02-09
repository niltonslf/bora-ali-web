export const formatDateFromBrToDb = (dateTime: string): string => {
  const [date, time] = dateTime.split(' ')
  const [day, month, year] = date.split('/')

  const formattedDate = `${year}-${month}-${day} ${time}`

  return formattedDate
}

export const formatDateToReadable = (dateTime: number): string => {
  if (!dateTime) return ''

  const date = new Date(Number(dateTime))
  const time = new Date(Number(dateTime))

  return `${date.toLocaleDateString('pt-BR')} ${time.toLocaleTimeString('pt-BR')}`
}
