import { UnexpectedError } from '@/data/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models'
import { CreateUser } from '@/domain/usecases'

export class RemoteCreateUser implements CreateUser {
  constructor(private readonly url: string, private readonly httpClient: HttpClient) {}

  async create(account: AccountModel): Promise<AccountModel> {
    const response = await this.httpClient.request({ url: this.url, body: account, method: 'post' })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body

      default:
        throw new UnexpectedError()
    }
  }
}
