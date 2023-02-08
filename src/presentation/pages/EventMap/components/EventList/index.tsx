import { useContext } from 'react'

import { EventModel } from '@/domain/models'
import { EventCard } from '@/presentation/components'
import { EventCardSkeleton } from '@/presentation/components/EventCard/EventCardSkeleton'
import { Grid } from '@chakra-ui/react'

import { EventMapContext } from '../../context'
import { EventsNotFound } from '../EventsNotFound'

type EventListProps = {
  events: EventModel[]
  isLoading?: boolean
}

export const EventList: React.FC<EventListProps> = ({ events, isLoading = false }) => {
  const context = useContext(EventMapContext)

  const handleMouseOver = (event: EventModel | null) => {
    context?.setFocusEvent(event)
  }

  return (
    <Grid
      width={{ base: 'calc(100vw - 32px)', md: '100%' }}
      display={{ base: 'flex', md: 'grid' }}
      gridTemplateColumns={{ base: 'unset', md: '1fr 1fr' }}
      overflowX='auto'
      height='100%'
      gap={4}
      data-testid='event-list'
    >
      {isLoading ? (
        <EventCardSkeleton />
      ) : (
        <>
          {events.length ? (
            events.map((event, index) => (
              <EventCard event={event} key={index} onMouseOver={handleMouseOver} />
            ))
          ) : (
            <EventsNotFound />
          )}
        </>
      )}
    </Grid>
  )
}

EventList.displayName = 'EventList'
