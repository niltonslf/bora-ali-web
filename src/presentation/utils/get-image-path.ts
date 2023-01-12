export const getImagePath = (src: string) => {
  const base = import.meta.env.VITE_IMAGES_PATH as string

  if (!src) return null

  return `${base}${src}`
}
