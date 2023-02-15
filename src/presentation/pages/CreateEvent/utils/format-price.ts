export const formatPrice = (price: string | null) => {
  if (price == null) return price

  return price.replaceAll('.', '').replace(',', '.').replace('R$', '')
}
