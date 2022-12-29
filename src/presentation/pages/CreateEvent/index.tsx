import { useNavigate } from 'react-router-dom'

import { FetchPlaceType } from '@/domain/usecases'
import { CreateEvent as ICreateEvent } from '@/domain/usecases/create-event'
import { Header } from '@/presentation/components'
import { Flex, useToast } from '@chakra-ui/react'

import { Footer } from './components/Footer'
import { FormPages } from './components/FormPages'
import { CreateEventProvider } from './context/create-event-context'

type CreateEventProps = {
  createEvent: ICreateEvent
  fetchPlaceType: FetchPlaceType
}

export const CreateEvent: React.FC<CreateEventProps> = ({ createEvent, fetchPlaceType }) => {
  const toast = useToast()
  const navigation = useNavigate()

  const onSubmit = async (formState: any) => {
    const formData = new FormData()

    for (const key in formState) formData.append(key, formState[key])

    Array.from(formState.images).forEach((image) => {
      formData.append('images', image as any)
    })

    try {
      await createEvent.create(formData)
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
    }
  }

  return (
    <CreateEventProvider>
      <Flex direction='column' width='100%' minHeight='100vh' justifyContent='space-between'>
        <Header />
        <FormPages fetchPlaceType={fetchPlaceType} />
        <Footer onSubmit={onSubmit} />
      </Flex>
    </CreateEventProvider>
  )
}

CreateEvent.displayName = 'CreateEvent'
