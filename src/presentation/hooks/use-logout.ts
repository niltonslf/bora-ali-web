import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context'

export const useLogout = () => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(AuthContext)

  return (): void => {
    if (setCurrentAccount) setCurrentAccount()
    navigate('/auth')
  }
}
