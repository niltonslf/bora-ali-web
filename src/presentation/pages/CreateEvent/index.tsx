import { Header, StepContainer, StepItem, StepPageProvider } from '@/presentation/components'
import { Flex } from '@chakra-ui/react'

import { Footer } from './components/Footer'

type CreateEventProps = {
  any?: any
}

export const CreateEvent: React.FC<CreateEventProps> = () => {
  return (
    <Flex direction='column' width='100%' height='100vh' justifyContent='space-between'>
      <Header />
      <StepPageProvider>
        <StepContainer>
          <StepItem>Item 01</StepItem>
          <StepItem>Item 02</StepItem>
          <StepItem>Item 03</StepItem>
        </StepContainer>

        <Footer />
      </StepPageProvider>
    </Flex>
  )
}

CreateEvent.displayName = 'CreateEvent'
