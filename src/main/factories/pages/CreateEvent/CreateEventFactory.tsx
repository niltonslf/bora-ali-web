import { RemotePersistEvent } from '@/data/usecases/persist-event/remote-persist-event'
import { CreateEvent } from '@/presentation/pages'

import { makeAuthorizeHttpClientDecorator } from '../../decorators'

export const CreateEventFactory: React.FC = () => {
  const axios = makeAuthorizeHttpClientDecorator()

  const createEvent = new RemotePersistEvent(axios)

  return <CreateEvent createEvent={createEvent} />
}

CreateEventFactory.displayName = 'CreateEventFactory'
