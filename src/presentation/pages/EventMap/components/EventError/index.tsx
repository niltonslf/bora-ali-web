import { Flex } from '@chakra-ui/react'

type EventErrorProps = {
  error: string
}

export const EventError: React.FC<EventErrorProps> = ({ error }) => {
  return (
    <Flex data-testid='error' width='100%'>
      {error}
    </Flex>
  )
}

EventError.displayName = 'EventError'
