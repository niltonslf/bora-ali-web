import { RemoteFetchEvent, RemotePersistEvent } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { Profile } from '@/presentation/pages/Profile'

export const ProfileFactory: React.FC = () => {
  const axios = makeAuthorizeHttpClientDecorator()
  const fetchEvent = new RemoteFetchEvent(axios)
  const persistEvent = new RemotePersistEvent(axios)

  return <Profile fetchEvent={fetchEvent} persistEvent={persistEvent} />
}

ProfileFactory.displayName = 'ProfileFactory'
