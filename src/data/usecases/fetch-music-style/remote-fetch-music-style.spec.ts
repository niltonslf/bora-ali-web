import { describe, expect, test } from 'vitest'

import { InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test/mock-http'
import { mockPlaceTypeListModel } from '@/domain/test/mock-fetch-place-type'

import { RemoteFetchMusicStyle } from './remote-fetch-music-style'

type SutTypes = {
  sut: RemoteFetchMusicStyle
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteFetchMusicStyle(httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteFetchMusicStyle', () => {
  test('should call RemoteFetchMusicStyle with correct url', async () => {
    const { sut, httpClientSpy } = makeSut()

    await sut.fetchAll()

    expect(httpClientSpy.url).toBe('/music-style')
  })

  test('ensure RemoteFetchMusicStyle return correct values on status code 200', async () => {
    const { sut, httpClientSpy } = makeSut()

    const mockResponse = mockPlaceTypeListModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockResponse,
    }

    const response = await sut.fetchAll()
    expect(response).toEqual(mockResponse)
  })

  test('ensure RemoteFetchMusicStyle return empty values on status code 204', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }

    const response = await sut.fetchAll()
    expect(response).toEqual([])
  })

  test('ensure RemoteFetchMusicStyle return error on status code 400', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('ensure RemoteFetchMusicStyle return error on status code 401', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('ensure RemoteFetchMusicStyle return error on status code 500', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }

    const promise = sut.fetchAll()
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
