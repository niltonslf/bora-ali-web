import { HttpResponse } from './http-response'

export type HttpGetParams = {
  url: string
  header?: any
}

export interface HttpGetClient<Response = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<Response>>
}
