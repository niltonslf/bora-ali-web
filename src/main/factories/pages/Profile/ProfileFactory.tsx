import { RemoteFetchEvent } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { Profile } from '@/presentation/pages/Profile'

export const ProfileFactory: React.FC = () => {
  const axios = makeAxiosHttpClient()
  const fetchEvent = new RemoteFetchEvent(axios)

  return <Profile fetchEvent={fetchEvent} />
}

ProfileFactory.displayName = 'ProfileFactory'
