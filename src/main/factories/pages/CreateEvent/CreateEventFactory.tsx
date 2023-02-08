import { RemoteCreateEvent } from '@/data/usecases/create-event/remote-create-event'
import { RemoteFetchCategory } from '@/data/usecases/fetch-category/remote-fetch-category'
import { RemoteFetchMusicStyle } from '@/data/usecases/fetch-music-style/remote-fetch-music-style'
import { RemoteFetchPlaceType } from '@/data/usecases/fetch-place-type/remote-fetch-place-type'
import { CreateEvent } from '@/presentation/pages'

import { makeAuthorizeHttpClientDecorator } from '../../decorators'

export const CreateEventFactory: React.FC = () => {
  const axios = makeAuthorizeHttpClientDecorator()
  const createEvent = new RemoteCreateEvent(axios)
  const fetchPlaceType = new RemoteFetchPlaceType(axios)
  const fetchCategory = new RemoteFetchCategory(axios)
  const fetchMusicStyle = new RemoteFetchMusicStyle(axios)

  return (
    <CreateEvent
      createEvent={createEvent}
      fetchPlaceType={fetchPlaceType}
      fetchCategory={fetchCategory}
      fetchMusicStyle={fetchMusicStyle}
    />
  )
}

CreateEventFactory.displayName = 'CreateEventFactory'
