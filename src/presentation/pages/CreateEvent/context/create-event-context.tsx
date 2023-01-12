import constate from 'constate'
import { useState } from 'react'

import { EventCreationModel } from '@/domain/models'

const useCreateEvent = () => {
  const [activePage, setActivePage] = useState(0)
  const [isFirst, setIsFirst] = useState(false)
  const [isLast, setIsLast] = useState(false)
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)
  const [formState, setFormState] = useState<EventCreationModel>({} as any)

  return {
    activePage,
    setActivePage,
    isFirst,
    setIsFirst,
    isLast,
    setIsLast,
    formState,
    setFormState,
    isNextButtonDisabled,
    setIsNextButtonDisabled,
  }
}

export const [CreateEventProvider, useCreateEventContext] = constate(useCreateEvent)
