import { AccountModel } from '../models'

export interface AuthUser {
  create: (account: AccountModel) => Promise<AccountModel>
}
