import { InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode, HttpGetClient } from '@/data/protocols/http'
import { PlaceTypeModel } from '@/domain/models'
import { FetchMusicStyle } from '@/domain/usecases'

export class RemoteFetchMusicStyle implements FetchMusicStyle {
  constructor(private readonly url: string, private readonly httpClient: HttpGetClient) {}

  async fetchAll(): Promise<PlaceTypeModel[]> {
    const response = await this.httpClient.get({ url: this.url })

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
