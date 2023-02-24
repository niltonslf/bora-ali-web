import { RemoteFetchEvent } from '@/data/usecases'
import { RemoteFetchCategory } from '@/data/usecases/fetch-category/remote-fetch-category'
import { RemoteFetchMusicStyle } from '@/data/usecases/fetch-music-style/remote-fetch-music-style'
import { RemoteFetchPlaceType } from '@/data/usecases/fetch-place-type/remote-fetch-place-type'
import { RemotePersistEvent } from '@/data/usecases/persist-event/remote-persist-event'
import { CreateEvent } from '@/presentation/pages'

import { makeAuthorizeHttpClientDecorator } from '../../decorators'

export const CreateEventFactory: React.FC = () => {
  const axios = makeAuthorizeHttpClientDecorator()

  const createEvent = new RemotePersistEvent(axios)
  const fetchEvent = new RemoteFetchEvent(axios)

  const fetchPlaceType = new RemoteFetchPlaceType(axios)
  const fetchCategory = new RemoteFetchCategory(axios)
  const fetchMusicStyle = new RemoteFetchMusicStyle(axios)

  return (
    <CreateEvent
      createEvent={createEvent}
      fetchPlaceType={fetchPlaceType}
      fetchCategory={fetchCategory}
      fetchMusicStyle={fetchMusicStyle}
      fetchEvent={fetchEvent}
    />
  )
}

CreateEventFactory.displayName = 'CreateEventFactory'
