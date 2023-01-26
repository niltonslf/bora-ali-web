import axios from 'axios'
import { describe, expect, Mocked, test, vi } from 'vitest'

import { mockHttpRequest } from '@/data/test/mock-http'
import { mockAxios, mockAxiosResponse } from '@/infra/test'

import { AxiosHttpClient } from './axios-http-client'

vi.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const mockedAxios = mockAxios()
  const sut = new AxiosHttpClient()

  return { mockedAxios, sut }
}

describe('AxiosHttpClient', () => {
  test('Call axios with correct url', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockHttpRequest()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method,
      params: request.params,
    })
  })

  test('Should return correct response on axios', async () => {
    const { sut, mockedAxios } = makeSut()

    const response = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(response).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    })
  })

  test('Should return error on axios', async () => {
    const { sut, mockedAxios } = makeSut()

    mockedAxios.request.mockRejectedValue({ response: mockAxiosResponse() })

    const response = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(response).toEqual({
      statusCode: axiosResponse.response?.status,
      body: axiosResponse.response.data,
    })
  })
})
