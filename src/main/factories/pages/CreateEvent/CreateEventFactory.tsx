import { RemoteCreateEvent } from '@/data/usecases/create-event/remote-create-event'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { CreateEvent } from '@/presentation/pages'

export const CreateEventFactory: React.FC = () => {
  const axios = makeAxiosHttpClient()
  const createEvent = new RemoteCreateEvent('/event', axios)

  return <CreateEvent createEvent={createEvent} />
}

CreateEventFactory.displayName = 'CreateEventFactory'
