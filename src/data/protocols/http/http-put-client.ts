import { HttpResponse } from './http-response'

export type HttpPutParams<Body> = {
  url: string
  body?: Body
  header?: any
}

export interface HttpPutClient<Body = any, Response = any> {
  put: (params: HttpPutParams<Body>) => Promise<HttpResponse<Response>>
}
