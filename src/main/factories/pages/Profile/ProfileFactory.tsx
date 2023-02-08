import { RemoteFetchEvent } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { Profile } from '@/presentation/pages/Profile'

export const ProfileFactory: React.FC = () => {
  const axios = makeAuthorizeHttpClientDecorator()
  const fetchEvent = new RemoteFetchEvent(axios)

  return <Profile fetchEvent={fetchEvent} />
}

ProfileFactory.displayName = 'ProfileFactory'
