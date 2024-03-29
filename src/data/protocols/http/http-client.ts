export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequest<Body = any> = {
  url: string
  method: HttpMethod
  headers?: any
  body?: Body
  params?: any
}

export interface HttpResponse<Response = any> {
  statusCode: HttpStatusCode
  body?: Response
}

export interface HttpClient<Response = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<Response>>
}
