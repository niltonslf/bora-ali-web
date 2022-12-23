import { RemoteFetchEvent } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { EventMap } from '@/presentation/pages'

export const EventMapFactory: React.FC = () => {
  const axios = makeAxiosHttpClient()
  const fetchEvent = new RemoteFetchEvent('/event', axios)

  return <EventMap fetchEvent={fetchEvent} />
}

EventMapFactory.displayName = 'EventMapFactory'
