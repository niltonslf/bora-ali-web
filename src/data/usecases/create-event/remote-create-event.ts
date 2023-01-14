import { UnexpectedError } from '@/data/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { EventModel } from '@/domain/models'
import { CreateEvent } from '@/domain/usecases/create-event'

export class RemoteCreateEvent implements CreateEvent {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<EventModel>) {}

  async create(event: FormData): Promise<EventModel | null> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: event,
      headers: {
        'Content-Type': 'multipart/form-data',
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
