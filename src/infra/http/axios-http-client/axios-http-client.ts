import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpClient {
  private readonly axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL })
  }

  async request(params: HttpRequest): Promise<HttpResponse> {
    let response: AxiosResponse

    try {
      response = await this.axiosInstance.request({
        url: params.url,
        method: params.method,
        data: params.body,
        headers: params?.headers,
        params: params?.params,
      })
    } catch (error: any) {
      if ([HttpStatusCode.unauthorized, HttpStatusCode.forbidden].includes(error.response.status)) {
        window.location.assign('/auth')
      }

      response = error.response
    }

    return this.adapt(response)
  }

  private adapt(response: AxiosResponse): HttpResponse {
    return { statusCode: response.status, body: response.data }
  }
}
