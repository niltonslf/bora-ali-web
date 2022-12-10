export const getImagePath = (src: string) => {
  const base = import.meta.env.VITE_API_URL as string

  return `${base}/${src}`
}
