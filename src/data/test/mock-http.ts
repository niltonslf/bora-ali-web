import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.avatar(),
  header: JSON.parse(faker.datatype.json()),
})

export class HttpGetClientSpy implements HttpGetClient {
  url: string

  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.url = params.url
    return {
      statusCode: faker.internet.httpStatusCode(),
    }
  }
}
