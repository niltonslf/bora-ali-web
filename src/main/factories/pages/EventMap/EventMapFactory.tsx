import { RemoteFetchEvent } from '@/data/usecases'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { EventMap } from '@/presentation/pages'

export const EventMapFactory: React.FC = () => {
  const axios = new AxiosHttpClient()
  const fetchEvent = new RemoteFetchEvent('/event', axios)

  return <EventMap fetchEvent={fetchEvent} />
}

EventMapFactory.displayName = 'EventMapFactory'
