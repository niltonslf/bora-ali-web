import { InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode, HttpGetClient } from '@/data/protocols/http'
import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'

export class RemoteFetchEvent implements FetchEvent {
  constructor(private readonly url: string, private readonly httpClient: HttpGetClient) {}

  async fetchAll(): Promise<EventModel[]> {
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
