import { CreateEvent as ICreateEvent } from '@/domain/usecases/create-event'
import { Header } from '@/presentation/components'
import { Flex } from '@chakra-ui/react'

import { Footer } from './components/Footer'
import { FormPages } from './components/FormPages'
import { CreateEventProvider } from './context/create-event-context'

type CreateEventProps = {
  createEvent: ICreateEvent
}

export const CreateEvent: React.FC<CreateEventProps> = ({ createEvent }) => {
  const onSubmit = async (formState: any) => {
    const formData = new FormData()

    for (const key in formState) formData.append(key, formState[key])

    Array.from(formState.images).forEach((image) => {
      formData.append('images', image as any)
    })

    await createEvent.create(formData)
  }

  return (
    <CreateEventProvider>
      <Flex direction='column' width='100%' minHeight='100vh' justifyContent='space-between'>
        <Header />
        <FormPages />
        <Footer onSubmit={onSubmit} />
      </Flex>
    </CreateEventProvider>
  )
}

CreateEvent.displayName = 'CreateEvent'
