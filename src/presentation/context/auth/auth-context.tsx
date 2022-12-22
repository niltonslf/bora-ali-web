import React, { createContext } from 'react'

import { AccountModel } from '@/domain/models'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

interface ApiAccountResponse extends AccountModel {
  accessToken: string
}

type AuthProps = {
  setCurrentAccount?: (account?: AccountModel, accessToken?: string) => void
  getCurrentAccount: () => ApiAccountResponse
}

const localStorageAdapter = new LocalStorageAdapter()

export const AuthContext = createContext<AuthProps>({
  getCurrentAccount: () => null as any,
})
AuthContext.displayName = 'AuthContext'

const setCurrentAccountAdapter = (account?: AccountModel, accessToken?: string): void => {
  const data = !account && !accessToken ? null : { ...account, accessToken }

  localStorageAdapter.set('account', data)
}

const getCurrentAccountAdapter = (): ApiAccountResponse => {
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
