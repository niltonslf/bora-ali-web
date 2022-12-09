import axios from 'axios'
import { describe, expect, Mocked, test, vi } from 'vitest'

import { HttpPostParams } from '@/data/protocols/http'
import { mockGetRequest } from '@/data/test/mock-http'
import { EventModel } from '@/domain/models'
import { mockEventModel } from '@/domain/test/mock-fetch-event'
import { mockAxios, mockAxiosResponse } from '@/infra/test'
import { faker } from '@faker-js/faker'

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

    test('Should return error on axios.get', async () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.get.mockRejectedValue({
        response: mockAxiosResponse(),
      })

      const response = await sut.get(mockGetRequest())
      const axiosResponse = await mockedAxios.get.mock.results[0].value

      expect(response).toEqual({
        statusCode: axiosResponse.response.status,
        body: axiosResponse.response.data,
      })
    })
  })

  describe('Post', () => {
    test('call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut()

      const request: HttpPostParams<EventModel> = {
        url: faker.internet.url(),
        body: mockEventModel(),
      }

      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('axios.post should return correct body', async () => {
      const { sut, mockedAxios } = makeSut()

      const request: HttpPostParams<EventModel> = {
        url: faker.internet.url(),
        body: mockEventModel(),
      }

      const response = await sut.post(request)
      const axiosResponse = mockedAxios.post.mock.results[0].value

      expect(response).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      })
    })
  })
})
