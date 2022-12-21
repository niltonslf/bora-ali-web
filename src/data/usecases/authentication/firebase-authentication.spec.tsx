import { describe, expect, test, vi } from 'vitest'

import { RemoteCreateUserSpy, HttpPostClientSpy, FirebaseClientSpy } from '@/data/test'
import { mockAccountModel } from '@/domain/test/mock-create-user'
import { faker } from '@faker-js/faker'

import { FirebaseAuthentication } from './firebase-authentication'

describe('FirebaseAuthentication', () => {
  test('should call FirebaseAuthentication.auth with success', async () => {
    const httpClient = new HttpPostClientSpy()
    const firebaseClient = new FirebaseClientSpy()
    const remoteCreateUser = new RemoteCreateUserSpy(faker.internet.url(), httpClient)

    const sut = new FirebaseAuthentication(firebaseClient, remoteCreateUser)

    const accountModelMock = mockAccountModel()

    vi.spyOn(remoteCreateUser, 'create').mockResolvedValue(accountModelMock)

    const response = await sut.auth()

    expect(response.user).toEqual(accountModelMock)
    expect(response.accessToken).toBeTruthy()
  })
})
