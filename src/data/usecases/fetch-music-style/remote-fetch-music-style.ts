import { InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode, HttpClient } from '@/data/protocols/http'
import { MusicStyleModel } from '@/domain/models'
import { FetchMusicStyle } from '@/domain/usecases'

export class RemoteFetchMusicStyle implements FetchMusicStyle {
  constructor(private readonly httpClient: HttpClient) {}

  async fetchAll(): Promise<MusicStyleModel[]> {
    const response = await this.httpClient.request({ url: '/music-style', method: 'get' })

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
