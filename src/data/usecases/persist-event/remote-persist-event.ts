import { AccessDeniedError, InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpClient, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import { EventModel } from '@/domain/models'
import { PersistEvent } from '@/domain/usecases/persist-event'

export class RemotePersistEvent implements PersistEvent {
  constructor(private readonly httpClient: HttpClient<EventModel>) {}

  async create(event: FormData): Promise<EventModel | null> {
    const response = await this.httpClient.request({
      url: '/event',
      method: 'post',
      body: event,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response?.body || null

      default:
        throw new UnexpectedError()
    }
  }

  async update(event: FormData, eventId: string): Promise<EventModel | null> {
    const response = await this.httpClient.request({
      url: `/event/${eventId}`,
      method: 'put',
      body: event,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response?.body || null

      default:
        throw new UnexpectedError()
    }
  }

  async deleteById(eventId: string): Promise<any> {
    const response = await this.httpClient.request({ url: `/event/${eventId}`, method: 'delete' })

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
