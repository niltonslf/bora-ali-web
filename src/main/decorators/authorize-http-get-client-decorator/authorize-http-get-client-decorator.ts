import { GetStorage } from '@/data/protocols/cache'
import { HttpGetClient, HttpParams, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get(params: HttpParams): Promise<HttpResponse> {
    this.getStorage.get('account')

    await this.httpGetClient.get(params)

    return {
      statusCode: 200,
    }
  }
}