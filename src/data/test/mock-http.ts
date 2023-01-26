import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.avatar(),
  headers: faker.datatype.uuid(),
  body: JSON.parse(faker.datatype.json()),
  method: 'get',
  params: faker.datatype.string(),
})

export class HttpClientSpy<Response = any> implements HttpClient<Response> {
  url: string
  method?: string
  body?: any
  headers?: any
  params?: any
  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.ok,
  }

  async request(params: HttpRequest): Promise<HttpResponse> {
    this.url = params.url
    this.method = params.method
    this.body = params.body
    this.headers = params.headers
    this.params = params.params
    return this.response
  }
}
