import { AccountModel } from '@/domain/models'

export interface Authentication {
  auth: () => Promise<AccountModel>
}
