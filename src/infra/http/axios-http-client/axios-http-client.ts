import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { HttpPostClient, HttpGetClient, HttpGetParams, HttpPostParams } from '@/data/protocols/http'
import { HttpPutClient, HttpPutParams } from '@/data/protocols/http/http-put-client'
import { HttpResponse } from '@/data/protocols/http/http-response'

export class AxiosHttpClient implements HttpGetClient, HttpPostClient, HttpPutClient {
  private readonly axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    })
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let response: AxiosResponse

    try {
      response = await this.axiosInstance.get(params.url)
    } catch (error: any) {
      response = error.response
    }

    return this.adapt(response)
  }

  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let response: AxiosResponse

    try {
      response = await this.axiosInstance.post(params.url, params.body)
    } catch (error: any) {
      response = error.response
    }

    return this.adapt(response)
  }

  async put(params: HttpPutParams<any>): Promise<HttpResponse<any>> {
    let response: AxiosResponse

    try {
      response = await this.axiosInstance.put(params.url, params.body)
    } catch (error: any) {
      response = error.response
    }

    return this.adapt(response)
  }

  private adapt(response: AxiosResponse): HttpResponse {
    return { statusCode: response.status, body: response.data }
  }
}
