import { Header } from '@/presentation/components'
import { Flex } from '@chakra-ui/react'

import { Footer } from './components/Footer'
import { FormPages } from './components/FormPages'
import { CreateEventProvider } from './context/create-event-context'

type CreateEventProps = {
  any?: any
}

export const CreateEvent: React.FC<CreateEventProps> = () => {
  const onSubmit = (formState: any) => {
    const formData = new FormData()

    for (const key in formState) {
      const value = formState[key]
      formData.append(key, value)
    }
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
