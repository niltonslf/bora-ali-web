import { AccountModel } from '../models'

export interface CreateUser {
  create: (account: AccountModel) => Promise<AccountModel>
}
