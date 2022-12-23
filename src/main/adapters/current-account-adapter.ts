import { AccountModel } from '@/domain/models'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export interface ApiAccountResponse extends AccountModel {
  accessToken: string
}

const localStorageAdapter = new LocalStorageAdapter()

export const setCurrentAccountAdapter = (account?: AccountModel, accessToken?: string): void => {
  const data = !account && !accessToken ? null : { ...account, accessToken }

  localStorageAdapter.set('account', data)
}

export const getCurrentAccountAdapter = (): ApiAccountResponse => {
  return localStorageAdapter.get('account')
}
