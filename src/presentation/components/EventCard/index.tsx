import { Link } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { getImagePath } from '@/presentation/utils'
import { Card, CardBody, Stack, Heading, Image, Text } from '@chakra-ui/react'

type EventCardProps = {
  event: EventModel
  onMouseOver?: (event: EventModel) => void
}

export const EventCard: React.FC<EventCardProps> = ({ event, onMouseOver = () => null }) => {
  const defaultImage = '/assets/images/no-image.png'
  return (
    <Link to={`/event/${event.id}`}>
      <Card
        boxShadow='none'
        data-testid='event-item'
        background='white'
        onMouseOver={() => onMouseOver(event)}
      >
        <CardBody padding={0}>
          <Image
            src={getImagePath(event?.images[0]?.image) || defaultImage}
            alt={event.name}
            borderRadius='lg'
            data-testid='image'
            width='100%'
            height='12.5rem'
            display='block'
            objectFit='cover'
          />
          <Stack mt='2'>
            <Heading size='sm' data-testid='title'>
              {event.name}
            </Heading>
            <Text noOfLines={2} textStyle='paragraph' data-testid='description'>
              {event.description}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  )
}

EventCard.displayName = 'EventCard'
