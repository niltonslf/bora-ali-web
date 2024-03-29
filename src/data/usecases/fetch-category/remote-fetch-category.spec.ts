import { describe, expect, test } from 'vitest'

import { InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test/mock-http'
import { mockPlaceTypeListModel } from '@/domain/test/mock-fetch-place-type'

import { RemoteFetchCategory } from './remote-fetch-category'

type SutTypes = {
  sut: RemoteFetchCategory
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteFetchCategory(httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteFetchPlaceCategory', () => {
  test('should call RemoteFetchPlaceCategory with correct url', async () => {
    const { sut, httpClientSpy } = makeSut()

    await sut.fetchAll()

    expect(httpClientSpy.url).toBe('/category')
  })

  test('ensure RemoteFetchPlaceCategory return correct values on status code 200', async () => {
    const { sut, httpClientSpy } = makeSut()

    const mockResponse = mockPlaceTypeListModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockResponse,
    }

    const response = await sut.fetchAll()
    expect(response).toEqual(mockResponse)
  })

  test('ensure RemoteFetchPlaceCategory return empty values on status code 204', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }

    const response = await sut.fetchAll()
    expect(response).toEqual([])
  })

  test('ensure RemoteFetchPlaceCategory return error on status code 400', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('ensure RemoteFetchPlaceCategory return error on status code 401', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('ensure RemoteFetchPlaceCategory return error on status code 500', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
