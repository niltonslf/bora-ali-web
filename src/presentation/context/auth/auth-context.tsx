import React, { createContext } from 'react'

import { AccountModel } from '@/domain/models'
import {
  ApiAccountResponse,
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter'

type AuthProps = {
  setCurrentAccount: (account?: AccountModel) => void
  getCurrentAccount: () => ApiAccountResponse
}

export const AuthContext = createContext<AuthProps>({
  getCurrentAccount: () => null as any,
} as AuthProps)
AuthContext.displayName = 'AuthContext'

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
