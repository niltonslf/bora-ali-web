import { describe, expect, test } from 'vitest'

import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test/mock-http'
import { mockEventListModel } from '@/domain/test/mock-fetch-event'
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

  test('ensure RemoteFetchEvents return correct values on status code 200', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    const mockResponse = mockEventListModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockResponse,
    }

    const response = await sut.fetchAll()
    expect(response).toEqual(mockResponse)
  })

  test('ensure RemoteFetchEvents return empty values on status code 204', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }

    const response = await sut.fetchAll()
    expect(response).toEqual([])
  })
})
