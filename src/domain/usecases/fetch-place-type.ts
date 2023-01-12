import { PlaceTypeModel } from '@/domain/models'

export interface FetchPlaceType {
  fetchAll: () => Promise<PlaceTypeModel[]>
}
