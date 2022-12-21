import { describe, expect, test, vi } from 'vitest'

import { UnexpectedError } from '@/data/errors'
import { RemoteCreateUserSpy, FirebaseClientSpy } from '@/data/test'
import { mockAccountModel } from '@/domain/test/mock-create-user'

import { FirebaseAuthentication } from './firebase-authentication'

describe('FirebaseAuthentication', () => {
  test('should call FirebaseAuthentication.auth with success', async () => {
    const firebaseClient = new FirebaseClientSpy()
    const remoteCreateUser = new RemoteCreateUserSpy()

    const sut = new FirebaseAuthentication(firebaseClient, remoteCreateUser)

    const accountModelMock = mockAccountModel()

    vi.spyOn(remoteCreateUser, 'create').mockResolvedValue(accountModelMock)

    const response = await sut.auth()

    expect(response.user).toEqual(accountModelMock)
    expect(response.accessToken).toBeTruthy()
  })

  test('FirebaseAuthentication.auth should fail ', () => {
    const firebaseClient = new FirebaseClientSpy()
    const remoteCreateUser = new RemoteCreateUserSpy()

    const sut = new FirebaseAuthentication(firebaseClient, remoteCreateUser)

    vi.spyOn(remoteCreateUser, 'create').mockRejectedValue(new UnexpectedError())

    const response = sut.auth()

    expect(response).rejects.toThrow(new UnexpectedError())
  })
})
