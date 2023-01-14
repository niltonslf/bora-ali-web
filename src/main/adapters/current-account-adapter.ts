import { AccountModel } from '@/domain/models'

import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'

export interface ApiAccountResponse extends AccountModel {
  accessToken: string
}

export const setCurrentAccountAdapter = (account?: AccountModel, accessToken?: string): void => {
  makeLocalStorageAdapter().set('account', { ...account, accessToken })
}

export const getCurrentAccountAdapter = (): ApiAccountResponse => {
  return makeLocalStorageAdapter().get('account')
}
