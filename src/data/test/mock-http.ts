import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.avatar(),
  headers: faker.datatype.uuid(),
  body: JSON.parse(faker.datatype.json()),
  method: 'get',
})

export class HttpClientSpy<Response = any> implements HttpClient<Response> {
  url: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.ok,
  }

  async request(params: HttpRequest): Promise<HttpResponse> {
    this.url = params.url
    this.method = params.method
    this.body = params.body
    this.headers = params.headers
    return this.response
  }
}
