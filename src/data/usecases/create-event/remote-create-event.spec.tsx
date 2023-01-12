import { describe, expect, test } from 'vitest'

import { UnexpectedError } from '@/data/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpPostClientSpy } from '@/data/test'
import { mockEventCreationModel } from '@/domain/test'
import { faker } from '@faker-js/faker'

import { RemoteCreateEvent } from './remote-create-event'

type SutTypes = {
  sut: RemoteCreateEvent
  httpClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpPostClientSpy()
  const sut = new RemoteCreateEvent(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteCreateEvent', () => {
  test('should call RemoteCreateEvent with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    const body = mockEventCreationModel()

    await sut.create(body)

    expect(httpClientSpy.url).toEqual(url)
    expect(httpClientSpy.body).toEqual(body)
  })

  test('ensure RemoteCreateEvent.create will return correct value on status 200', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    const body = mockEventCreationModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body,
    }

    const response = await sut.create(body)
    expect(response).toEqual(body)
  })

  test('ensure RemoteCreateEvent.create will return correct value on status 500', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    const body = mockEventCreationModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body,
    }

    const response = sut.create(body)
    expect(response).rejects.toThrow(new UnexpectedError())
  })
})
