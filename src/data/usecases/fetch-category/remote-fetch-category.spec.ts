import { describe, expect, test } from 'vitest'

import { InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test/mock-http'
import { mockPlaceTypeListModel } from '@/domain/test/mock-fetch-place-type'
import { faker } from '@faker-js/faker'

import { RemoteFetchCategory } from './remote-fetch-category'

type SutTypes = {
  sut: RemoteFetchCategory
  httpClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpGetClientSpy()
  const sut = new RemoteFetchCategory(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteFetchPlaceCategory', () => {
  test('should call RemoteFetchPlaceCategory with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    await sut.fetchAll()

    expect(httpClientSpy.url).toBe(url)
  })

  test('ensure RemoteFetchPlaceCategory return correct values on status code 200', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    const mockResponse = mockPlaceTypeListModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockResponse,
    }

    const response = await sut.fetchAll()
    expect(response).toEqual(mockResponse)
  })

  test('ensure RemoteFetchPlaceCategory return empty values on status code 204', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }

    const response = await sut.fetchAll()
    expect(response).toEqual([])
  })

  test('ensure RemoteFetchPlaceCategory return error on status code 400', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('ensure RemoteFetchPlaceCategory return error on status code 401', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('ensure RemoteFetchPlaceCategory return error on status code 500', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
