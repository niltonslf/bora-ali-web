import { RemoteCreateEvent } from '@/data/usecases/create-event/remote-create-event'
import { RemoteFetchPlaceType } from '@/data/usecases/fetch-place-type/remote-fetch-place-type'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { CreateEvent } from '@/presentation/pages'

export const CreateEventFactory: React.FC = () => {
  const axios = makeAxiosHttpClient()
  const createEvent = new RemoteCreateEvent('/event', axios)
  const fetchPlaceType = new RemoteFetchPlaceType('/place-type', axios)

  return <CreateEvent createEvent={createEvent} fetchPlaceType={fetchPlaceType} />
}

CreateEventFactory.displayName = 'CreateEventFactory'
