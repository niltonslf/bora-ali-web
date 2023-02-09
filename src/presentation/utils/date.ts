export const formatDateFromBrToDb = (dateTime: string): string => {
  const [date, time] = dateTime.split(' ')
  const [day, month, year] = date.split('/')

  const formattedDate = `${year}-${month}-${day} ${time}`

  return formattedDate
}

export const formatDateToReadable = (dateTime: string): string => {
  if (!dateTime) return ''

  const date = new Date(dateTime)
  const time = new Date(dateTime)

  return `${date.toLocaleDateString('pt-BR')} ${time.toLocaleTimeString('pt-BR')}`
}
