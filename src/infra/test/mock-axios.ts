import axios, { AxiosResponse } from 'axios'
import { Mocked, vi } from 'vitest'

import { faker } from '@faker-js/faker'

export const mockAxiosResponse = (): AxiosResponse => {
  return {
    data: faker.internet.userName(),
    status: faker.internet.httpStatusCode(),
    headers: {},
    config: {},
    statusText: '',
  }
}

export const mockAxios = (): Mocked<typeof axios> => {
  const mockAxios = axios as Mocked<typeof axios>

  mockAxios.create = vi.fn()
  mockAxios.create.mockReturnValue(mockAxios)

  mockAxios.get.mockClear().mockResolvedValueOnce(mockAxiosResponse())

  return mockAxios
}
