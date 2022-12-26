export type EventModel = {
  id: number
  name: string
  description: string
  images: string
  placeType: string
  category: string[]
  musicalStyle: string[]
  hasMeal: boolean
  price: string
  address: string
  lat: number
  lng: number
  startDate: Date
  endDate: Date
  user: {
    name: string
  }
}

export interface EventCreationModel extends Omit<EventModel, 'images' | 'user'> {
  images: FileList[]
  userId: string
}
