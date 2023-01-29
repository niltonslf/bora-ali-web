export const formatDateAndTime = (value: number): string => {
  const date = new Date(value)
  const year = date.toLocaleString('default', { year: 'numeric' })
  const month = date.toLocaleString('default', { month: '2-digit' })
  const day = date.toLocaleString('default', { day: '2-digit' })

  const formattedDate = `${year}-${month}-${day}`
  const hours = date.toLocaleTimeString('pt-BR')

  return `${formattedDate}T${hours}`
}

export const parseDateToNumber = (dateTime: string): number => {
  const date = new Date(dateTime)
  return date.getTime()
}

export const formatDateToReadable = (dateTime: number) => {
  const date = new Date(Number(dateTime))

  return `${date.toLocaleDateString('pt-BR')} - ${date.toLocaleTimeString()}`
}
