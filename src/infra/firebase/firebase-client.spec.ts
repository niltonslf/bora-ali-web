import * as firebase from 'firebase/auth'
import { describe, test, expect, vi } from 'vitest'

import { UnexpectedError } from '@/data/errors'
import { faker } from '@faker-js/faker'

import { FirebaseClient } from './firebase-client'

vi.mock('firebase/auth')

type SutTypes = {
  sut: FirebaseClient
}

const makeSut = (): SutTypes => {
  const sut = new FirebaseClient()
  return { sut }
}

describe('FirebaseClient', () => {
  test('SignIn method should call firebase/auth and return user and credential', async () => {
    const user = JSON.parse(faker.datatype.json())
    const credential = faker.datatype.uuid()

    vi.spyOn(firebase, 'signInWithPopup').mockReturnValue({ user } as any)

    vi.spyOn(firebase.GoogleAuthProvider, 'credentialFromResult').mockReturnValue(credential as any)

    const { sut } = makeSut()
    const response = await sut.signIn()

    expect(response).toEqual({ user, credential })
  })

  test('FirebaseClient.signIn should throw error if there is not credential', async () => {
    const credential = ''

    vi.spyOn(firebase.GoogleAuthProvider, 'credentialFromResult').mockReturnValue(credential as any)

    const { sut } = makeSut()
    const response = sut.signIn()

    expect(response).rejects.toThrow(new UnexpectedError())
  })

  test('FirebaseClient.signIn should throw error if fails', async () => {
    vi.spyOn(firebase, 'signInWithPopup').mockRejectedValue(new UnexpectedError())

    const { sut } = makeSut()
    const response = sut.signIn()

    expect(response).rejects.toThrow(new UnexpectedError())
  })
})
