import { describe, expect, test } from 'vitest'

import { UnexpectedError } from '@/data/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { mockEventCreationFormDataModel } from '@/domain/test'

import { RemoteCreateEvent } from './remote-create-event'

type SutTypes = {
  sut: RemoteCreateEvent
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteCreateEvent(httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteCreateEvent', () => {
  test('should call RemoteCreateEvent with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()

    const body = mockEventCreationFormDataModel()

    await sut.create(body)

    expect(httpClientSpy.url).toEqual('/event')
    expect(httpClientSpy.body).toEqual(body)
  })

  test('ensure RemoteCreateEvent.create will return correct value on status 200', async () => {
    const { sut, httpClientSpy } = makeSut()

    const body = mockEventCreationFormDataModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body,
    }

    const response = await sut.create(body)
    expect(response).toEqual(body)
  })

  test('ensure RemoteCreateEvent.create will return correct value on status 500', async () => {
    const { sut, httpClientSpy } = makeSut()

    const body = mockEventCreationFormDataModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body,
    }

    const response = sut.create(body)
    expect(response).rejects.toThrow(new UnexpectedError())
  })
})
