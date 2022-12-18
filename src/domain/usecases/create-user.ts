import { AccountModel } from '../models'

export interface CreateUser {
  create: () => Promise<AccountModel>
}
