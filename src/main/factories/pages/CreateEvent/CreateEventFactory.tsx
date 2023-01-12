import { RemoteCreateEvent } from '@/data/usecases/create-event/remote-create-event'
import { RemoteFetchCategory } from '@/data/usecases/fetch-category/remote-fetch-category'
import { RemoteFetchMusicStyle } from '@/data/usecases/fetch-music-style/remote-fetch-music-style'
import { RemoteFetchPlaceType } from '@/data/usecases/fetch-place-type/remote-fetch-place-type'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { CreateEvent } from '@/presentation/pages'

export const CreateEventFactory: React.FC = () => {
  const axios = makeAxiosHttpClient()
  const createEvent = new RemoteCreateEvent('/event', axios)
  const fetchPlaceType = new RemoteFetchPlaceType('/place-type', axios)
  const fetchCategory = new RemoteFetchCategory('/category', axios)
  const fetchMusicStyle = new RemoteFetchMusicStyle('/music-style', axios)

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
