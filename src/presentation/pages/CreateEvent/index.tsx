import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EventCreationModel } from '@/domain/models'
import { FetchCategory, FetchEvent, FetchMusicStyle, FetchPlaceType } from '@/domain/usecases'
import { CreateEvent as ICreateEvent } from '@/domain/usecases/create-event'
import { Header } from '@/presentation/components'
import { useAuth } from '@/presentation/hooks/use-auth'
import { Flex, useToast } from '@chakra-ui/react'

import { Footer } from './components/Footer'
import { FormPages } from './components/FormPages'
import { CreateEventProvider } from './context/create-event-context'

type CreateEventProps = {
  createEvent: ICreateEvent
  fetchPlaceType: FetchPlaceType
  fetchCategory: FetchCategory
  fetchMusicStyle: FetchMusicStyle
  fetchEvent: FetchEvent
}

export const CreateEvent: React.FC<CreateEventProps> = ({
  createEvent,
  fetchPlaceType,
  fetchCategory,
  fetchMusicStyle,
  fetchEvent,
}) => {
  const toast = useToast()
  const navigation = useNavigate()
  const { getCurrentAccount } = useAuth()
  const account = getCurrentAccount()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (formState: EventCreationModel) => {
    try {
      setIsLoading(true)
      if (formState.id !== undefined) await handleUpdate(formState)
      else await handleCreate(formState)
      toast({
        title: 'Evento criado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigation('/')
    } catch (error) {
      toast({
        title: 'Error ao cadastrar evento.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (formState: EventCreationModel) => {
    const formData = new FormData()
    if (!account.id) throw new Error('User missing')

    const cleanPrice = formState.price.replaceAll('.', '').replace(',', '.').replace('R$', '')
    formState.price = cleanPrice

    // @ts-expect-error
    for (const key in formState) formData.append(key, formState[key])

    if (formState.images)
      Array.from(formState.images).forEach((image) => formData.append('images', image as any))

    formData.append('userId', account.id)
    await createEvent.create(formData)
  }
  const handleUpdate = async (formState: EventCreationModel) => {
    const formData = new FormData()
    if (!account.id) throw new Error('User missing')

    const cleanPrice = formState.price.replaceAll('.', '').replace(',', '.').replace('R$', '')
    formState.price = cleanPrice

    // @ts-expect-error
    for (const key in formState) formData.append(key, formState[key])

    if (formState.images)
      Array.from(formState.images).forEach((image) => formData.append('images', image as any))

    await createEvent.update(formData)
  }

  return (
    <CreateEventProvider>
      <Flex direction='column' width='100%' minHeight='100vh' justifyContent='space-between'>
        <Header />
        <FormPages
          fetchEvent={fetchEvent}
          fetchPlaceType={fetchPlaceType}
          fetchCategory={fetchCategory}
          fetchMusicStyle={fetchMusicStyle}
        />
        <Footer onSubmit={onSubmit} isLoading={isLoading} />
      </Flex>
    </CreateEventProvider>
  )
}

CreateEvent.displayName = 'CreateEvent'
