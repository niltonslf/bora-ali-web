import { AccountModel } from '@/domain/models'

export type AuthenticationResponse = {
  user: AccountModel
  accessToken: string
}

export interface Authentication {
  auth: () => Promise<AuthenticationResponse>
}
