export type EventModel = {
  id: number
  name: string
  description: string
  images: string[]
  placeType: string
  category: string[]
  musicalStyle: string[]
  hasMeal: boolean
  price: number
  cep: string
  address: string
  lat: string
  lng: string
}

export interface EventCreationModel extends EventModel {
  images: any[]
}
