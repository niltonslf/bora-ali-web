import { createContext, useState } from 'react'

import { EventModel } from '@/domain/models'

type EventMapContextProps = {
  focusEvent: EventModel | null
  setFocusEvent: React.Dispatch<React.SetStateAction<EventModel | null>>
}

export const EventMapContext = createContext<EventMapContextProps | null>(null)

export const EventMapProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [focusEvent, setFocusEvent] = useState<EventModel | null>(null)

  return (
    <EventMapContext.Provider value={{ focusEvent, setFocusEvent }}>
      {children}
    </EventMapContext.Provider>
  )
}
