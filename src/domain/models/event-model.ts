import { PlaceTypeModel, CategoryModel, ImageModel, MusicStyleModel, AccountModel } from './'

export type EventModel = {
  id: number
  user: AccountModel
  name: string
  description: string
  images: ImageModel[]
  placeType: PlaceTypeModel
  musicalStyle: MusicStyleModel
  categories: CategoryModel[]
  hasMeal: boolean
  price: number
  address: string
  lat: number
  lng: number
  startDate: string
  endDate: string | null
  repeatDays: string[] | null
}

export interface EventCreationModel
  extends Omit<EventModel, 'id' | 'images' | 'user' | 'categories' | 'placeType' | 'musicalStyle'> {
  images: FileList[]
  categories: string[]
  placeTypeId: string
  musicStyleId: string
  userId: string
}
