import { UnexpectedError } from '@/data/errors'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { EventCreationModel, EventModel } from '@/domain/models'
import { CreateEvent } from '@/domain/usecases/create-event'

export class RemoteCreateEvent implements CreateEvent {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<EventCreationModel, EventModel>
  ) {}

  async create(event: EventCreationModel): Promise<EventModel | null> {
    const response = await this.httpClient.post({ url: this.url, body: event, headers: {} })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response?.body || null

      default:
        throw new UnexpectedError()
    }
  }
}
