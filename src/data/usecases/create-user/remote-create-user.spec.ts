import { describe, test, expect } from 'vitest'

import { UnexpectedError } from '@/data/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpPostClientSpy } from '@/data/test/mock-http'
import { mockAccountModel } from '@/domain/test/mock-create-user'
import { faker } from '@faker-js/faker'

import { RemoteCreateUser } from './remote-create-user'

type SutTypes = {
  httpClientSpy: HttpPostClientSpy
  sut: RemoteCreateUser
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpPostClientSpy()
  const sut = new RemoteCreateUser(url, httpClientSpy)

  return {
    httpClientSpy,
    sut,
  }
}

describe.only('RemoteCreateUser', () => {
  test('Should call RemoteCreateUser with correct values', () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)

    const account = mockAccountModel()

    sut.create(account)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.body).toEqual(account)
  })

  test('ensure RemoteCreateUser return an AccountModel on status 200', async () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)

    const mockResponse = mockAccountModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockResponse,
    }

    const response = await sut.create(mockAccountModel())

    expect(response).toEqual(mockResponse)
  })

  test('ensure RemoteCreateUser throw error on fail', async () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }

    const response = sut.create(mockAccountModel())

    expect(response).rejects.toThrow(new UnexpectedError())
  })
})
