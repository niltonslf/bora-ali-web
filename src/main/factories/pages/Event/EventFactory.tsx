import { makePresenceAtEventFactory, makeRemoteFetchEvent } from '@/main/factories/data/usecases'
import { Event } from '@/presentation/pages'

export const EventFactory: React.FC = () => {
  const fetchEvent = makeRemoteFetchEvent()
  const presenceAtEvent = makePresenceAtEventFactory()

  return <Event fetchEvent={fetchEvent} presenceAtEvent={presenceAtEvent} />
}

EventFactory.displayName = 'EventFactory'
