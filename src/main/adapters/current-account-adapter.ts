import { AccountModel } from '@/domain/models'

import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'

export interface ApiAccountResponse extends AccountModel {
  accessToken: string
}

export const setCurrentAccountAdapter = (account?: AccountModel, accessToken?: string): void => {
  const data = !account && !accessToken ? null : { ...account, accessToken }

  makeLocalStorageAdapter().set('account', data)
}

export const getCurrentAccountAdapter = (): ApiAccountResponse => {
  return makeLocalStorageAdapter().get('account')
}
