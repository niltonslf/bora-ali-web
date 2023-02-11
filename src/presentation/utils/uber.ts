export const getUberUrl = (lat: number, lng: number, address: string) => {
  const clientId = import.meta.env.VITE_UBER_CLIENT_ID

  return `https://m.uber.com/ul/?client_id=${clientId}/&action=setPickup&pickup=my_location&dropoff[formatted_address]=${address}&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}`
}
