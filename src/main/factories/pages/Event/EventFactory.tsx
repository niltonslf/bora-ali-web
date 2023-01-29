import { RemoteFetchEvent } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { Event } from '@/presentation/pages'

export const EventFactory: React.FC = () => {
  const axios = makeAuthorizeHttpClientDecorator()
  const fetchEvent = new RemoteFetchEvent('/event/location', axios)

  return <Event fetchEvent={fetchEvent} />
}

EventFactory.displayName = 'EventFactory'
