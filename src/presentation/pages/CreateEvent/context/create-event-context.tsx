import dayjs from 'dayjs'
import React, { createContext, useContext, useState } from 'react'

import { EventCreationModel } from '@/domain/models'

interface CreateEventContextProps {
  activePage: number
  isFirst: boolean
  isLast: boolean
  formState: EventCreationModel
  isNextButtonDisabled: boolean
  isEdit: boolean
  setActivePage: React.Dispatch<React.SetStateAction<number>>
  setIsFirst: React.Dispatch<React.SetStateAction<boolean>>
  setIsLast: React.Dispatch<React.SetStateAction<boolean>>
  setFormState: React.Dispatch<React.SetStateAction<EventCreationModel>>
  setIsNextButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateEventContext = createContext<CreateEventContextProps>(
  {} as CreateEventContextProps
)
CreateEventContext.displayName = 'CreateEventContext'

export const CreateEventProvider: React.ComponentType<any> = ({ children }) => {
  const [activePage, setActivePage] = useState(0)
  const [isFirst, setIsFirst] = useState(false)
  const [isLast, setIsLast] = useState(false)
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)
  const [formState, setFormState] = useState<EventCreationModel>({
    startDate: `${dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')}`,
    endDate: null,
    price: '',
    imagesUrl: [] as any,
  } as EventCreationModel)

  const isEdit = formState?.id !== undefined

  return (
    <CreateEventContext.Provider
      value={{
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
        isEdit,
      }}
    >
      {children}
    </CreateEventContext.Provider>
  )
}

export const useCreateEventContext = () => {
  const context = useContext(CreateEventContext)

  return { ...context }
}
