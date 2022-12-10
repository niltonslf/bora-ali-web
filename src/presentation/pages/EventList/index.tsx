import { Button, Heading, Text } from '@chakra-ui/react'

type EventListProps = {
  any?: any
}

export const EventList: React.FC<EventListProps> = () => {
  return (
    <>
      <Heading size='h1' backgroundColor='primary'>
        Events
      </Heading>

      <Text color='primary' textStyle='h1'>
        Text
      </Text>

      <Button colorScheme='blue' textStyle='paragraph'>
        Button
      </Button>
    </>
  )
}

EventList.displayName = 'EventList'
