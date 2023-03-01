import { RemoteFetchMusicStyle } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteFetchMusicStyle = () => {
  const axios = makeAuthorizeHttpClientDecorator()
  return new RemoteFetchMusicStyle(axios)
}
