import { AccountModel } from '@/domain/models'

export type AuthenticationResponse = {
  account: AccountModel
}

export interface Authentication {
  auth: () => Promise<AuthenticationResponse>
}
