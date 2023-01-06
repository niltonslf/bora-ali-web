import { PlaceTypeModel } from '@/domain/models'
import { mockPlaceTypeListModel } from '@/domain/test/mock-fetch-place-type'
import { FetchPlaceType } from '@/domain/usecases'

export class RemoteFetchPlaceTypeSpy implements FetchPlaceType {
  callsCount = 0
  response = mockPlaceTypeListModel()

  async fetchAll(): Promise<PlaceTypeModel[]> {
    this.callsCount++
    return this.response
  }
}
