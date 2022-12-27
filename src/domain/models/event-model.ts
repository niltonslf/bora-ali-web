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
  lat: string
  lng: string
  startDate: Date
  endDate: Date
  user: AccountModel
}

export interface EventCreationModel extends Omit<EventModel, 'images' | 'user' | 'category'> {
  images: FileList[]
  placeTypeId: string
  musicalStyleId: string
  category: string[]
  userId: string
}
