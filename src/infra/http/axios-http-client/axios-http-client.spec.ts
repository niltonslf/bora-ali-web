// import axios from 'axios'
import { describe, expect, test, vi } from 'vitest'

import { mockAxios } from '@/infra/test'
import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from './axios-http-client'

vi.mock('axios')

describe('AxiosHttpClient', () => {
  describe('Get', () => {
    test('Call axios.get with correct url', async () => {
      const mockedAxios = mockAxios()
      const sut = new AxiosHttpClient()

      const request = { url: faker.internet.url() }

      await sut.get(request)

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })
  })
})
