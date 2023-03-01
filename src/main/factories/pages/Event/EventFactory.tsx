import { makeRemoteFetchEvent } from '@/main/factories/data/usecases'
import { Event } from '@/presentation/pages'

export const EventFactory: React.FC = () => {
  const fetchEvent = makeRemoteFetchEvent()

  return <Event fetchEvent={fetchEvent} />
}

EventFactory.displayName = 'EventFactory'
