import { EventModel } from '@/domain/models'
import { EventCard } from '@/presentation/components'
import { EventCardSkeleton } from '@/presentation/components/EventCard/EventCardSkeleton'
import { Grid } from '@chakra-ui/react'

type EventListProps = {
  events: EventModel[]
}

export const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <Grid width='100%' gridTemplateColumns='1fr 1fr' gap={4} data-testid='event-list'>
      {events.length ? (
        events.map((event, index) => <EventCard event={event} key={index} />)
      ) : (
        <EventCardSkeleton />
      )}
    </Grid>
  )
}

EventList.displayName = 'EventList'
