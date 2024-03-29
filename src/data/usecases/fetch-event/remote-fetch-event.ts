import { AccessDeniedError, InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode, HttpClient, HttpResponse } from '@/data/protocols/http'
import { EventModel } from '@/domain/models'
import { FetchEvent, FiltersProps } from '@/domain/usecases'

export class RemoteFetchEvent implements FetchEvent {
  constructor(private readonly httpClient: HttpClient) {}

  async fetchAll(): Promise<EventModel[]> {
    const response = await this.httpClient.request({ url: '/event', method: 'get' })

    return this.handleResponse<EventModel[]>(response)
  }

  async fetchByUserId(userId: string): Promise<EventModel[]> {
    const response = await this.httpClient.request({
      url: '/event',
      method: 'get',
      params: {
        userId,
      },
    })

    return this.handleResponse<EventModel[]>(response)
  }

  async fetchByLocation(
    lat: number,
    lng: number,
    radius: number,
    filters?: FiltersProps
  ): Promise<EventModel[]> {
    const response = await this.httpClient.request({
      url: '/event/location',
      method: 'get',
      params: { lat, lng, radius, ...filters },
    })

    return this.handleResponse<EventModel[]>(response)
  }

  async fetchById(eventId: string): Promise<EventModel> {
    const response = await this.httpClient.request({
      url: `/event/${eventId}`,
      method: 'get',
    })

    return this.handleResponse<EventModel>(response)
  }

  private handleResponse<Response>(response: HttpResponse): Response {
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body

      case HttpStatusCode.noContent:
        return null as any

      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()

      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()

      default:
        throw new UnexpectedError()
    }
  }
}
