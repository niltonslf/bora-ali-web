import { AccountModel } from '@/domain/models'
import { AuthUser } from '@/domain/usecases'

export class RemoteAuthUserSpy implements AuthUser {
  async create(account: AccountModel): Promise<AccountModel> {
    return account
  }
}
