import { UnexpectedError } from '@/data/errors'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models'
import { CreateUser } from '@/domain/usecases'

export class RemoteCreateUser implements CreateUser {
  constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

  async create(account: AccountModel): Promise<AccountModel> {
    const response = await this.httpPostClient.post({ url: this.url, body: account })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body

      default:
        throw new UnexpectedError()
    }
  }
}
