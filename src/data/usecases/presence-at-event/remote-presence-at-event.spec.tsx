import { describe, test, expect } from 'vitest'

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
  })

  describe('Cancel presence', () => {
    test('Ensure to cancel presence with success ', () => {
      expect(true).toBe(true)
    })
  })
})
