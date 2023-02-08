import { describe, test, expect } from 'vitest'

import { UnexpectedError } from '@/data/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test/mock-http'
import { mockAccountModel } from '@/domain/test/mock-create-user'

import { RemoteAuthUser } from './remote-auth-user'

type SutTypes = {
  httpClientSpy: HttpClientSpy
  sut: RemoteAuthUser
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAuthUser(httpClientSpy)

  return {
    httpClientSpy,
    sut,
  }
}

describe('RemoteAuthUser', () => {
  test('Should call RemoteAuthUser with correct values', () => {
    const { httpClientSpy, sut } = makeSut()

    const account = mockAccountModel()

    sut.create(account)

    expect(httpClientSpy.url).toBe('/auth')
    expect(httpClientSpy.body).toEqual(account)
  })

  test('ensure RemoteAuthUser return an AccountModel on status 200', async () => {
    const { httpClientSpy, sut } = makeSut()

    const mockResponse = mockAccountModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockResponse,
    }

    const response = await sut.create(mockAccountModel())

    expect(response).toEqual(mockResponse)
  })

  test('ensure RemoteAuthUser throw error on fail', async () => {
    const { httpClientSpy, sut } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }

    const response = sut.create(mockAccountModel())

    expect(response).rejects.toThrow(new UnexpectedError())
  })
})
