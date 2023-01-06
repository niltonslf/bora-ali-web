import { PlaceTypeModel, CategoryModel, ImageModel, MusicStyleModel, AccountModel } from './'

export type EventModel = {
  id: number
  name: string
  description: string
  images: ImageModel[]
  placeType: PlaceTypeModel
  musicalStyle: MusicStyleModel
  categories: CategoryModel[]
  hasMeal: boolean
  price: string
  address: string
  lat: string
  lng: string
  startDate: number
  endDate: number
  user: AccountModel
}

export interface EventCreationModel
  extends Omit<EventModel, 'id' | 'images' | 'user' | 'categories' | 'placeType' | 'musicalStyle'> {
  images: FileList[]
  categories: string[]
  placeTypeId: string
  musicStyleId: string
  userId: string
}
