import { GetStorage } from '@/data/protocols/cache'
import { HttpGetClient, HttpParams, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get(params: HttpParams): Promise<HttpResponse> {
    const account = this.getStorage.get('account')

    if (account.accessToken) {
      Object.assign(params, {
        headers: {
          authorization: account.accessToken,
        },
      })
    }
    await this.httpGetClient.get(params)

    return {
      statusCode: 200,
    }
  }
}
