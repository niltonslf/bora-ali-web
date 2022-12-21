import React, { createContext } from 'react'

import { UnexpectedError } from '@/data/errors'
import { AccountModel } from '@/domain/models'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

type AuthProps = {
  setCurrentAccount?: (account: AccountModel, accessToken: string) => void
  getCurrentAccount?: () => AccountModel
}

const localStorageAdapter = new LocalStorageAdapter()

export const AuthContext = createContext<AuthProps>({})
AuthContext.displayName = 'AuthContext'

const setCurrentAccountAdapter = (account: AccountModel, accessToken: string): void => {
  if (!accessToken) throw new UnexpectedError()
  localStorageAdapter.set('account', { ...account, accessToken })
}

const getCurrentAccountAdapter = (): AccountModel => {
  return localStorageAdapter.get('account')
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        getCurrentAccount: getCurrentAccountAdapter,
        setCurrentAccount: setCurrentAccountAdapter,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
