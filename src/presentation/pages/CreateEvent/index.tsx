import { Header } from '@/presentation/components'
import { Flex } from '@chakra-ui/react'

import { Footer } from './components/Footer'

type CreateEventProps = {
  any?: any
}

export const CreateEvent: React.FC<CreateEventProps> = () => {
  return (
    <Flex direction='column' width='100%' height='100vh' justifyContent='space-between'>
      <Header />

      <Flex background='white' height='100%'>
        Content
      </Flex>

      <Footer />
    </Flex>
  )
}

CreateEvent.displayName = 'CreateEvent'
