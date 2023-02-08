import { InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode, HttpClient } from '@/data/protocols/http'
import { PlaceTypeModel } from '@/domain/models'
import { FetchPlaceType } from '@/domain/usecases'

export class RemoteFetchPlaceType implements FetchPlaceType {
  constructor(private readonly httpClient: HttpClient) {}

  async fetchAll(): Promise<PlaceTypeModel[]> {
    const response = await this.httpClient.request({ url: '/place-type', method: 'get' })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.noContent:
        return []
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
