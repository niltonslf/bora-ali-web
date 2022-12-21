import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '@/presentation/context'

type PrivateRouteProps = {
  component: React.ReactElement
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
  const { getCurrentAccount } = useContext(AuthContext)

  const account = getCurrentAccount ? getCurrentAccount() : null

  if (account?.accessToken) return component
  return <Navigate to='/auth' />
}
PrivateRoute.displayName = 'PrivateRoute'
