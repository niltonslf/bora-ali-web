import { UnexpectedError } from '@/data/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models'
import { AuthUser } from '@/domain/usecases'

export class RemoteAuthUser implements AuthUser {
  constructor(private readonly httpClient: HttpClient) {}

  async create(account: AccountModel): Promise<AccountModel> {
    const response = await this.httpClient.request({ url: '/auth', body: account, method: 'post' })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body

      default:
        throw new UnexpectedError()
    }
  }
}
