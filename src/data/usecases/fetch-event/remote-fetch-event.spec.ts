import { describe, expect, test } from 'vitest'

import { HttpGetClient, HttpGetParams } from '@/data/protocols/http/http-get-client'
import { HttpResponse } from '@/data/protocols/http/http-response'
import { faker } from '@faker-js/faker'

import { RemoteFetchEvent } from './remote-fetch-event'

class HttpGetClientSpy implements HttpGetClient {
  url: string

  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.url = params.url
    return {
      statusCode: faker.internet.httpStatusCode(),
    }
  }
}

describe('RemoteFetchEvent', () => {
  test('should call RemoteFetchEvents with correct url', async () => {
    const url = faker.internet.url()

    const httpClientSpy = new HttpGetClientSpy()
    const remoteFetchEvents = new RemoteFetchEvent(url, httpClientSpy)

    await remoteFetchEvents.fetchAll()

    expect(httpClientSpy.url).toBe(url)
  })
})
