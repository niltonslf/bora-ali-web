import { AccountModel } from '@/domain/models'
import { CreateUser } from '@/domain/usecases'

export class RemoteCreateUserSpy implements CreateUser {
  async create(account: AccountModel): Promise<AccountModel> {
    return account
  }
}
