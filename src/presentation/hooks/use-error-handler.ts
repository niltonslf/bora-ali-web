import { useNavigate } from 'react-router-dom'

import { AccessDeniedError } from '@/data/errors'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const navigate = useNavigate()

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) navigate('/auth')
    else callback(error)
  }
}
