import { HttpResponse } from './http-response'

export type HttpPostParams<Body> = {
  url: string
  body?: Body
  header?: any
}

export interface HttpPostClient<Body, Response = any> {
  post: (params: HttpPostParams<Body>) => Promise<HttpResponse<Response>>
}
