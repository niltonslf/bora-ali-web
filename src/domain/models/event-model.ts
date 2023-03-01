import {
  PlaceTypeModel,
  CategoryModel,
  ImageModel,
  MusicStyleModel,
  AccountModel,
  UserModel,
} from './'

export type EventModel = {
  id: string
  user: AccountModel
  name: string
  description: string
  images: ImageModel[]
  placeType: PlaceTypeModel
  musicStyle: MusicStyleModel
  categories: CategoryModel[]
  hasMeal: boolean
  price: string
  address: string
  lat: number
  lng: number
  startDate: string
  endDate: string | null
  startTime: string
  endTime: string
  repeatDays: string[] | null
  isPrivate: boolean
  participants: UserModel[]
}

export interface EventCreationModel
  extends Omit<
    EventModel,
    'id' | 'images' | 'user' | 'categories' | 'placeType' | 'musicStyle' | 'price'
  > {
  id?: string
  images: FileList[]
  imagesUrl: string[]
  categories: string[]
  placeTypeId: string
  musicStyleId: string
  userId: string
  price: string | null
}
