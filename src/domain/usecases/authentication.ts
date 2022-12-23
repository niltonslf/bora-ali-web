import { AccountModel } from '@/domain/models'

export type AuthenticationResponse = {
  account: AccountModel
  accessToken: string
}

export interface Authentication {
  auth: () => Promise<AuthenticationResponse>
}
