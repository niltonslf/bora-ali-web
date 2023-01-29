import { Flex, Heading } from '@chakra-ui/react'

type EventsNotFoundProps = {
  any?: any
}

export const EventsNotFound: React.FC<EventsNotFoundProps> = () => {
  return (
    <Flex direction='column'>
      <Heading size='md'>No events found :/</Heading>
    </Flex>
  )
}

EventsNotFound.displayName = 'EventsNotFound'
