import { AccessDeniedError } from '@/data/errors'

import { useLogout } from './use-logout'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const logout = useLogout()

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) logout()
    else callback(error)
  }
}
