import { describe, test, expect } from 'vitest'

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
})
