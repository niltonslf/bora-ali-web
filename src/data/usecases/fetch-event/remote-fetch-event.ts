import { AccessDeniedError, InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode, HttpClient } from '@/data/protocols/http'
import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'

export class RemoteFetchEvent implements FetchEvent {
  constructor(private readonly url: string, private readonly httpClient: HttpClient) {}

  async fetchAll(): Promise<EventModel[]> {
    const response = await this.httpClient.request({ url: this.url, method: 'get' })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body

      case HttpStatusCode.noContent:
        return []

      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()

      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()

      default:
        throw new UnexpectedError()
    }
  }

  async fetchByLocation(lat: number, lng: number, radius: number): Promise<EventModel[]> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: {
        lat,
        lng,
        radius,
      },
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body

      case HttpStatusCode.noContent:
        return []

      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()

      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()

      default:
        throw new UnexpectedError()
    }
  }
}
