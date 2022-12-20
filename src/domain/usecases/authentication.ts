import { AccountModel } from '@/domain/models'

export type AuthenticationResponse = {
  user: AccountModel
  token: string
}

export interface Authentication {
  auth: () => Promise<AuthenticationResponse>
}
