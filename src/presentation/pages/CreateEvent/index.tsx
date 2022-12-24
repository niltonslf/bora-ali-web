import { Header } from '@/presentation/components'
import { Flex } from '@chakra-ui/react'

import { Footer } from './components/Footer'
import { FormPages } from './components/FormPages'
import { CreateEventProvider } from './context/create-event-context'

type CreateEventProps = {
  any?: any
}

export const CreateEvent: React.FC<CreateEventProps> = () => {
  return (
    <CreateEventProvider>
      <Flex direction='column' width='100%' height='100vh' justifyContent='space-between'>
        <Header />
        <FormPages />
        <Footer />
      </Flex>
    </CreateEventProvider>
  )
}

CreateEvent.displayName = 'CreateEvent'
