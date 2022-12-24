import axios, { AxiosInstance, AxiosResponse } from 'axios'

import {
  HttpPostClient,
  HttpGetClient,
  HttpParams,
  HttpDeleteClient,
  HttpPutClient,
} from '@/data/protocols/http'
import { HttpResponse } from '@/data/protocols/http/http-response'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export class AxiosHttpClient
  implements HttpGetClient, HttpPostClient, HttpPutClient, HttpDeleteClient
{
  private readonly axiosInstance: AxiosInstance

  constructor(private readonly localStorageAdapter: LocalStorageAdapter) {
    const token = this.localStorageAdapter.get('account')?.accessToken as string

    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) this.localStorageAdapter.set('account', null)

        return await Promise.reject(error)
      }
    )
  }

  private async request(method: HttpMethod, params: HttpParams): Promise<HttpResponse> {
    let response: AxiosResponse

    try {
      if (method === 'get' || method === 'delete')
        response = await this.axiosInstance[method](params.url, { headers: params?.headers })
      else
        response = await this.axiosInstance[method](params.url, params.body, {
          headers: params?.headers,
        })
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
