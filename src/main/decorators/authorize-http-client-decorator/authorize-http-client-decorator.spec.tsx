import { describe, expect, test } from 'vitest'

import { HttpRequest } from '@/data/protocols/http'
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)
  return {
    sut,
    getStorageSpy,
    httpClientSpy,
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  test('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.request(mockHttpRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: 'get',
      headers: {
        field: faker.random.words(),
      },
    }

    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('should add headers to HttpClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = { ...mockAccountModel(), accessToken: faker.datatype.uuid() }

    const httpRequest: HttpRequest = { url: faker.internet.url(), method: 'get' }

    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual({
      authorization: `Bearer ${getStorageSpy.value.accessToken}`,
    })
  })

  test('should merge headers to HttpClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = { ...mockAccountModel(), accessToken: faker.datatype.uuid() }

    const field = faker.random.words()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: 'get',
      headers: { field },
    }

    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual({
      field,
      authorization: `Bearer ${getStorageSpy.value.accessToken}`,
    })
  })

  test('should return the same result HttpClient', async () => {
    const { sut, httpClientSpy } = makeSut()

    const httpResponse = await sut.request(mockHttpRequest())
    expect(httpResponse).toEqual(httpClientSpy.response)
  })
})
