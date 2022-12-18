import { describe, test, expect } from 'vitest'

import { HttpPostClientSpy } from '@/data/test/mock-http'
import { mockAccountModel } from '@/domain/test/mock-create-user'

import { RemoteCreateUser } from './remote-create-user'

describe.only('RemoteCreateUser', () => {
  test('Should call RemoteCreateUser with correct values', () => {
    const httpClientSpy = new HttpPostClientSpy()
    const remoteCreateUser = new RemoteCreateUser('/user', httpClientSpy)

    const account = mockAccountModel()

    remoteCreateUser.create(account)

    expect(httpClientSpy.url).toBe('/user')
    expect(httpClientSpy.body).toEqual(account)
  })
})
