import { UnexpectedError } from '@/data/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { PresenceAtEvent } from '@/domain/usecases'

export class RemotePresenceAtEvent implements PresenceAtEvent {
  constructor(private readonly httpClient: HttpClient) {}

  async confirm(eventId: string, userId: string): Promise<any> {
    const response = await this.httpClient.request({
      method: 'post',
      url: `/event/${eventId}/confirm-presence`,
      body: {
        userId,
      },
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response?.body || null

      default:
        throw new UnexpectedError()
    }
  }

  async cancel(eventId: string, userId: string): Promise<any> {
    const response = await this.httpClient.request({
      method: 'post',
      url: `/event/${eventId}/cancel-presence`,
      body: {
        userId,
      },
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response?.body || null

      default:
        throw new UnexpectedError()
    }
  }
}
