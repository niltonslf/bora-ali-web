export const formatDateFromBrToDb = (date: string): string => {
  const [day, month, year] = date.split('/')

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

export const formatDateToReadable = (dateTime: string): string => {
  if (!dateTime) return ''

  const date = new Date(dateTime)

  return `${date.toLocaleDateString('pt-BR')}`
}
