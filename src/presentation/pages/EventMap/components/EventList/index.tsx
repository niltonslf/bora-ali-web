import { useContext } from 'react'

import { EventModel } from '@/domain/models'
import { EventCard } from '@/presentation/components'
import { EventCardSkeleton } from '@/presentation/components/EventCard/EventCardSkeleton'
import { Grid } from '@chakra-ui/react'

import { EventMapContext } from '../../context'

type EventListProps = {
  events: EventModel[]
}

export const EventList: React.FC<EventListProps> = ({ events }) => {
  const context = useContext(EventMapContext)

  const handleMouseOver = (event: EventModel) => {
    context?.setFocusEvent(event)
  }

  return (
    <Grid width='100%' gridTemplateColumns='1fr 1fr' gap={4} data-testid='event-list'>
      {events.length ? (
        events.map((event, index) => (
          <EventCard event={event} key={index} onMouseOver={handleMouseOver} />
        ))
      ) : (
        <EventCardSkeleton />
      )}
    </Grid>
  )
}

EventList.displayName = 'EventList'
