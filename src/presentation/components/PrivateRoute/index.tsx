import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { AccountModel } from '@/domain/models'
import { AuthContext } from '@/presentation/context'

type PrivateRouteProps = {
  component: React.ReactElement
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
  const { getCurrentAccount } = useContext(AuthContext)
  const navigate = useNavigate()
  let account = {} as AccountModel

  try {
    account = getCurrentAccount() ?? null
  } catch (error) {
    navigate('/auth')
  }

  if (account?.accessToken) return component
  return <Navigate to='/auth' />
}
PrivateRoute.displayName = 'PrivateRoute'
