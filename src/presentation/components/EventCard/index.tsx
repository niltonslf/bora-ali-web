/* eslint-disable max-len */
import { Card, CardBody, Stack, Heading, Image, Text } from '@chakra-ui/react'

type EventCardProps = {
  any?: any
}

export const EventCard: React.FC<EventCardProps> = () => {
  return (
    <Card boxShadow='none'>
      <CardBody padding={0}>
        <Image
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack mt='2'>
          <Heading size='sm'>Living room Sofa</Heading>
          <Text noOfLines={2} textStyle='paragraph'>
            This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned
            spaces and for people
          </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

EventCard.displayName = 'EventCard'
