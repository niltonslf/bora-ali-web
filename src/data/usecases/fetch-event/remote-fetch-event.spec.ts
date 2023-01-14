import { describe, expect, test } from 'vitest'

import { AccessDeniedError, InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test/mock-http'
import { mockEventListModel } from '@/domain/test/mock-fetch-event'
import { faker } from '@faker-js/faker'

import { RemoteFetchEvent } from './remote-fetch-event'

type SutTypes = {
  sut: RemoteFetchEvent
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteFetchEvent(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteFetchEvent', () => {
  test('should call RemoteFetchEvent with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    await sut.fetchAll()

    expect(httpClientSpy.url).toBe(url)
  })

  test('ensure RemoteFetchEvent return correct values on status code 200', async () => {
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

  test('ensure RemoteFetchEvent return empty values on status code 204', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }

    const response = await sut.fetchAll()
    expect(response).toEqual([])
  })

  test('ensure RemoteFetchEvent return error on status code 400', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('ensure RemoteFetchEvent return error on status code 401', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('ensure RemoteFetchEvent return error on status code 403', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('ensure RemoteFetchEvent return error on status code 500', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
