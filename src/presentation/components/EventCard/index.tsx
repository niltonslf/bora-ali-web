import { Link } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { getImagePath } from '@/presentation/utils'
import { Card, CardBody, Stack, Heading, Image, Text, CardProps } from '@chakra-ui/react'

interface EventCardProps extends Omit<CardProps, 'onMouseOver'> {
  event: EventModel
  onMouseOver?: (event: EventModel | null) => void
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onMouseOver = () => null,
  ...props
}) => {
  const defaultImage = '/assets/images/no-image.png'
  return (
    <Card
      boxShadow='none'
      data-testid='event-item'
      background='white'
      {...props}
      onMouseOver={() => onMouseOver(event)}
      onMouseOut={() => onMouseOver(null)}
    >
      <Link to={`/event/${event.id}`}>
        <CardBody padding={0}>
          <Image
            background='url(/assets/images/no-image.png)'
            backgroundSize='cover'
            backgroundPosition='center'
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
            <Text
              noOfLines={2}
              textStyle='paragraph'
              data-testid='description'
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </Stack>
        </CardBody>
      </Link>
    </Card>
  )
}

EventCard.displayName = 'EventCard'
