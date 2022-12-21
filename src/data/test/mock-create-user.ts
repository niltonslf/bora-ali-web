import { AccountModel } from '@/domain/models'
import { CreateUser } from '@/domain/usecases'

import { HttpPostClientSpy } from './mock-http'

export class RemoteCreateUserSpy implements CreateUser {
  constructor(private readonly url: string, private readonly httpPostClient: HttpPostClientSpy) {}

  async create(account: AccountModel): Promise<AccountModel> {
    return account
  }
}
