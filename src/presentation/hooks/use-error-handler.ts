import { AccessDeniedError, InvalidCredentialsError } from '@/data/errors'

import { useLogout } from './use-logout'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const logout = useLogout()

  return (error: Error): void => {
    if (error instanceof AccessDeniedError || error instanceof InvalidCredentialsError) logout()
    else callback(error)
  }
}
