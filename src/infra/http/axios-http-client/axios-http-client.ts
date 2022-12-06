import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { HttpGetClient, HttpGetParams } from '@/data/protocols/http/http-get-client'
import { HttpResponse } from '@/data/protocols/http/http-response'

export class AxiosHttpClient implements HttpGetClient {
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

  private adapt(response: AxiosResponse): HttpResponse {
    return { statusCode: response.status, body: response.data }
  }
}
