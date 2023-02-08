import { Flex, Heading } from '@chakra-ui/react'

type EventsNotFoundProps = {
  any?: any
}

export const EventsNotFound: React.FC<EventsNotFoundProps> = () => {
  return (
    <Flex direction='column'>
      <Heading size='md'>Nenhum rolê encontrado</Heading>
    </Flex>
  )
}

EventsNotFound.displayName = 'EventsNotFound'
