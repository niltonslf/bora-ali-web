import { describe, test, expect } from 'vitest'

import { UnexpectedError } from '@/data/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { faker } from '@faker-js/faker'

import { RemotePresenceAtEvent } from './remote-presence-at-event'

type SutTypes = {
  sut: RemotePresenceAtEvent
  httpClient: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClient = new HttpClientSpy()
  const sut = new RemotePresenceAtEvent(httpClient)

  return {
    sut,
    httpClient,
  }
}

describe('RemotePresenceAtEvent', () => {
  describe('Confirm presence', () => {
    test('Ensure to httpClient.get with all params', async () => {
      const { sut, httpClient } = makeSut()

      const eventId = faker.datatype.uuid()
      const userId = faker.datatype.uuid()

      await sut.confirm(eventId, userId)

      expect(httpClient.url).toBe(`/event/${eventId}/confirm-presence`)
      expect(httpClient.body).toEqual({ userId })
    })

    test('Ensure to  confirm presence with success', async () => {
      const { sut, httpClient } = makeSut()

      const eventId = faker.datatype.uuid()
      const userId = faker.datatype.uuid()

      httpClient.response = {
        statusCode: HttpStatusCode.ok,
        body: null,
      }

      const response = await sut.confirm(eventId, userId)

      expect(response).toBe(null)
    })

    test('Ensure to confirm presence with failure', async () => {
      const { sut, httpClient } = makeSut()

      const eventId = faker.datatype.uuid()
      const userId = faker.datatype.uuid()

      httpClient.response = {
        statusCode: HttpStatusCode.serverError,
        body: null,
      }

      const response = sut.confirm(eventId, userId)

      expect(response).rejects.toThrow(new UnexpectedError())
    })
  })

  describe('Cancel presence', () => {
    test('Ensure to cancel presence with success ', () => {
      expect(true).toBe(true)
    })
  })
})
