import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'

export class RemoteFetchEvent implements FetchEvent {
  constructor(private readonly url: string, private readonly httpClient: HttpGetClient) {}

  async fetchAll(): Promise<EventModel[]> {
    this.httpClient.get({ url: this.url })
    return []
  }
}
