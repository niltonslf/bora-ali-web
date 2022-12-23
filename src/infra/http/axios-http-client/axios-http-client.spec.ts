import axios from 'axios'
import { describe, expect, Mocked, test, vi } from 'vitest'

import { mockGetRequest, mockPostRequest } from '@/data/test/mock-http'
import { mockAxios, mockAxiosResponse } from '@/infra/test'
import { LocalStorageAdapterSpy } from '@/infra/test/mock-local-storage-adapter'

import { AxiosHttpClient } from './axios-http-client'

vi.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const mockedAxios = mockAxios()
  const localStorageAdapterSpy = new LocalStorageAdapterSpy()

  const sut = new AxiosHttpClient(localStorageAdapterSpy)

  return { mockedAxios, sut }
}

describe('AxiosHttpClient', () => {
  describe('GET', () => {
    test('Call axios.get with correct url', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockGetRequest()

      await sut.get({ ...request })

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, {
        headers: request.headers,
      })
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

  describe('POST', () => {
    test('call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockPostRequest()

      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body, {
        headers: request.headers,
      })
    })

    test('axios.post should return correct body', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockPostRequest()

      const response = await sut.post(request)
      const axiosResponse = mockedAxios.post.mock.results[0].value

      expect(response).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      })
    })

    test('axios.post should return error on fail', async () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.post.mockRejectedValueOnce({ response: mockAxiosResponse() })

      const response = await sut.post(mockPostRequest())
      const axiosResponse = mockedAxios.post.mock.results[0].value.response

      expect(response).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      })
    })
  })

  describe('PUT', () => {
    test('call axios.put with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockPostRequest()

      await sut.put(request)

      expect(mockedAxios.put).toHaveBeenCalledWith(request.url, request.body, {
        headers: request.headers,
      })
    })

    test('axios.put should return correct body', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockPostRequest()

      const response = await sut.put(request)
      const axiosResponse = mockedAxios.put.mock.results[0].value

      expect(response).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      })
    })

    test('axios.put should return error on fail', async () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.put.mockRejectedValueOnce({ response: mockAxiosResponse() })

      const response = await sut.put(mockPostRequest())
      const axiosResponse = mockedAxios.put.mock.results[0].value.response

      expect(response).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      })
    })
  })

  describe('DELETE', () => {
    test('Call axios.delete with correct url', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockGetRequest()

      await sut.delete(request)

      expect(mockedAxios.delete).toHaveBeenCalledWith(request.url, {
        headers: request.headers,
      })
    })

    test('Should return correct response on axios.delete', async () => {
      const { sut, mockedAxios } = makeSut()

      const response = await sut.delete(mockGetRequest())
      const axiosResponse = await mockedAxios.delete.mock.results[0].value

      expect(response).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      })
    })

    test('Should return error on axios.delete', async () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.delete.mockRejectedValue({
        response: mockAxiosResponse(),
      })

      const response = await sut.delete(mockGetRequest())
      const axiosResponse = await mockedAxios.delete.mock.results[0].value

      expect(response).toEqual({
        statusCode: axiosResponse.response.status,
        body: axiosResponse.response.data,
      })
    })
  })
})
