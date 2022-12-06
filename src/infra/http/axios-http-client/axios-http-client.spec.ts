import axios from 'axios'
import { describe, expect, Mocked, test, vi } from 'vitest'

import { mockGetRequest } from '@/data/test/mock-http'
import { mockAxios } from '@/infra/test'

import { AxiosHttpClient } from './axios-http-client'

vi.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const mockedAxios = mockAxios()
  const sut = new AxiosHttpClient()

  return {
    sut,
    mockedAxios,
  }
}

describe('AxiosHttpClient', () => {
  describe('Get', () => {
    test('Call axios.get with correct url', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockGetRequest()

      await sut.get(request)

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })

    test('Should return correct response on axios.get', async () => {
      const { sut, mockedAxios } = makeSut()

      const response = await sut.get(mockGetRequest())
      const axiosResponse = await mockedAxios.get.mock.results[0].value

      expect(response).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      })
    })
  })
})
