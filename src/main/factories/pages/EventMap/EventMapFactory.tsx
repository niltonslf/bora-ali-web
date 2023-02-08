import { RemoteFetchEvent } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { EventMap } from '@/presentation/pages'

export const EventMapFactory: React.FC = () => {
  const axios = makeAuthorizeHttpClientDecorator()
  const fetchEvent = new RemoteFetchEvent(axios)

  return <EventMap fetchEvent={fetchEvent} />
}

EventMapFactory.displayName = 'EventMapFactory'
