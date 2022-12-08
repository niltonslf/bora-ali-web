import { describe, expect, test } from 'vitest'

import { HttpGetClientSpy } from '@/data/test/mock-http'
import { faker } from '@faker-js/faker'

import { RemoteFetchEvent } from './remote-fetch-event'

type SutTypes = {
  sut: RemoteFetchEvent
  httpClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpGetClientSpy()
  const sut = new RemoteFetchEvent(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteFetchEvent', () => {
  test('should call RemoteFetchEvents with correct url', async () => {
    const url = faker.internet.url()

    const { sut, httpClientSpy } = makeSut(url)

    await sut.fetchAll()

    expect(httpClientSpy.url).toBe(url)
  })
})
