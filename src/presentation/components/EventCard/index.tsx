/* eslint-disable max-len */
import { Link } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { getImagePath } from '@/presentation/utils'
import { Card, CardBody, Stack, Heading, Image, Text } from '@chakra-ui/react'

type EventCardProps = {
  event: EventModel
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`}>
      <Card boxShadow='none' data-testid='event-item'>
        <CardBody padding={0}>
          <Image src={getImagePath(event.image)} alt={event.name} borderRadius='lg' />
          <Stack mt='2'>
            <Heading size='sm'>{event.name}</Heading>
            <Text noOfLines={2} textStyle='paragraph'>
              {event.description}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  )
}

EventCard.displayName = 'EventCard'
