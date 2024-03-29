import { Link } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { getImagePath } from '@/presentation/utils'
import { Card, CardBody, Stack, Heading, Image, CardProps, Badge, Flex } from '@chakra-ui/react'

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
    <Link to={`/event/${event.id}`}>
      <Card
        boxShadow='none'
        data-testid='event-item'
        background='white'
        minWidth='200px'
        {...props}
        onMouseOver={() => onMouseOver(event)}
        onMouseOut={() => onMouseOver(null)}
      >
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
            height={{ base: '9.375rem', md: '12.5rem' }}
            display='block'
            objectFit='cover'
          />
          <Stack mt='2'>
            <Heading size='sm' data-testid='title'>
              {event.name}
            </Heading>

            <Flex gap='3px' maxWidth='100%' overflowX='auto' wrap='wrap'>
              {event?.categories.map((category) => (
                <Badge fontSize='0.5rem' key={`cat-${category.id}`}>
                  {category.name}
                </Badge>
              ))}

              <Badge fontSize='0.5rem'>
                {Number(event?.price) === 0 ? 'Entrada gratuita' : `R$${event?.price}`}
              </Badge>
              {Boolean(event?.hasMeal) && <Badge fontSize='0.5rem'>Alimentação</Badge>}
              <Badge fontSize='0.5rem'>{event?.musicStyle?.name}</Badge>
              <Badge fontSize='0.5rem'>{event?.placeType.name}</Badge>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  )
}

EventCard.displayName = 'EventCard'
