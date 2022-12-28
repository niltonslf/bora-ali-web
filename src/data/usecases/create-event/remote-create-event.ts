import { HttpPostClient } from '@/data/protocols/http'
import { EventCreationModel, EventModel } from '@/domain/models'
import { CreateEvent } from '@/domain/usecases/create-event'

export class RemoteCreateEvent implements CreateEvent {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<EventCreationModel, EventModel>
  ) {}

  async create(event: EventCreationModel): Promise<EventModel> {
    const response = await this.httpClient.post({ url: this.url, body: event, headers: {} })

    return response.body
  }
}
