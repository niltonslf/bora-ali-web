import axios, { AxiosInstance, AxiosResponse } from 'axios'

import {
  HttpPostClient,
  HttpGetClient,
  HttpParams,
  HttpDeleteClient,
  HttpPutClient,
} from '@/data/protocols/http'
import { HttpResponse } from '@/data/protocols/http/http-response'

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export class AxiosHttpClient
  implements HttpGetClient, HttpPostClient, HttpPutClient, HttpDeleteClient
{
  private readonly axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    })
  }

  private async request(method: HttpMethod, params: HttpParams): Promise<HttpResponse> {
    let response: AxiosResponse

    try {
      if (method === 'get' || method === 'delete')
        response = await this.axiosInstance[method](params.url)
      else response = await this.axiosInstance[method](params.url, params.body)
    } catch (error: any) {
      response = error.response
    }

    return this.adapt(response)
  }

  async get(params: HttpParams): Promise<HttpResponse> {
    return await this.request('get', params)
  }

  async post(params: HttpParams<any>): Promise<HttpResponse<any>> {
    return await this.request('post', params)
  }

  async put(params: HttpParams<any>): Promise<HttpResponse<any>> {
    return await this.request('put', params)
  }

  async delete(params: HttpParams<any>): Promise<HttpResponse<any>> {
    return await this.request('delete', params)
  }

  private adapt(response: AxiosResponse): HttpResponse {
    return { statusCode: response.status, body: response.data }
  }
}
