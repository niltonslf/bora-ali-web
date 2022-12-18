import {
  HttpGetClient,
  HttpParams,
  HttpPostClient,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockGetRequest = (): HttpParams => ({
  url: faker.internet.avatar(),
  header: JSON.parse(faker.datatype.json()),
})

export const mockPostRequest = (): HttpParams<any> => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json()),
})

export class HttpGetClientSpy implements HttpGetClient {
  url: string
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
  }

  async get(params: HttpParams): Promise<HttpResponse> {
    this.url = params.url
    return this.response
  }
}

export class HttpPostClientSpy implements HttpPostClient {
  url: string
  body: any
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
  }

  async post(params: HttpParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}
