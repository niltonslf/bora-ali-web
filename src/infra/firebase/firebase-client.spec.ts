import * as firebase from 'firebase/auth'
import { describe, test, expect, vi } from 'vitest'

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

describe.only('FirebaseClient', () => {
  test('FirebaseClient.signIn should call firebase/auth and return user and token', async () => {
    const user = JSON.parse(faker.datatype.json())
    const accessToken = faker.datatype.uuid()

    vi.spyOn(firebase, 'signInWithPopup').mockReturnValue({ user } as any)

    vi.spyOn(firebase.GoogleAuthProvider, 'credentialFromResult').mockReturnValue({
      accessToken,
    } as any)

    const { sut } = makeSut()
    const response = await sut.signIn()

    expect(response).toEqual({ user, token: accessToken })
  })

  test('FirebaseClient.signIn should call firebase/auth and return user and token', async () => {
    const user = JSON.parse(faker.datatype.json())
    const accessToken = faker.datatype.uuid()

    vi.spyOn(firebase, 'signInWithPopup').mockReturnValue({ user } as any)

    vi.spyOn(firebase.GoogleAuthProvider, 'credentialFromResult').mockReturnValue({
      accessToken,
    } as any)

    const { sut } = makeSut()
    const response = await sut.signIn()

    expect(response).toEqual({ user, token: accessToken })
  })
})
