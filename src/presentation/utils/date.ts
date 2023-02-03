export const formatDateAndTime = (value: number): string => {
  const date = new Date(value)
  const year = date.toLocaleString('default', { year: 'numeric' })
  const month = date.toLocaleString('default', { month: '2-digit' })
  const day = date.toLocaleString('default', { day: '2-digit' })

  const formattedDate = `${year}-${month}-${day}`

  return `${formattedDate}`
}

export const parseDateToNumber = (dateTime: string): number => {
  const date = new Date(`${dateTime} 00:00:00`)
  return date.getTime()
}

export const formatDateToReadable = (dateTime: number) => {
  if (!dateTime) return ''

  const date = new Date(Number(dateTime))

  return `${date.toLocaleDateString('pt-BR')}`
}
