import { PlaceTypeModel, CategoryModel, ImageModel, MusicStyleModel, AccountModel } from './'

export type EventModel = {
  id: number
  name: string
  description: string
  images: ImageModel[]
  placeType: PlaceTypeModel
  musicalStyle: MusicStyleModel
  category: CategoryModel[]
  hasMeal: boolean
  price: string
  address: string
  lat: number
  lng: number
  startDate: Date
  endDate: Date
  user: AccountModel
}

export interface EventCreationModel extends Omit<EventModel, 'images' | 'user'> {
  images: FileList[]
  userId: string
}
