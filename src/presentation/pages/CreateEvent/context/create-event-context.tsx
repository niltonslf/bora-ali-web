import constate from 'constate'
import { useState } from 'react'

const useCreateEvent = () => {
  const [activePage, setActivePage] = useState(0)
  const [isFirst, setIsFirst] = useState(false)
  const [isLast, setIsLast] = useState(false)

  return {
    activePage,
    setActivePage,
    isFirst,
    setIsFirst,
    isLast,
    setIsLast,
  }
}

export const [CreateEventProvider, useCreateEventContext] = constate(useCreateEvent)
