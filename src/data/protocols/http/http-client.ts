import { HttpResponse } from './http-response'

export type HttpParams<Body = any> = {
  url: string
  headers?: any
  body?: Body
}

export interface HttpGetClient<Response = any> {
  get: (params: HttpParams) => Promise<HttpResponse<Response>>
}

export interface HttpPostClient<Body = any, Response = any> {
  post: (params: HttpParams<Body>) => Promise<HttpResponse<Response>>
}

export interface HttpPutClient<Body = any, Response = any> {
  put: (params: HttpParams<Body>) => Promise<HttpResponse<Response>>
}

export interface HttpDeleteClient<Body = any, Response = any> {
  delete: (params: HttpParams<Body>) => Promise<HttpResponse<Response>>
}
