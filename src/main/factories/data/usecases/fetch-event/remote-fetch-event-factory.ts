import { RemoteFetchEvent } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteFetchEvent = () => {
  const axios = makeAuthorizeHttpClientDecorator()
  return new RemoteFetchEvent(axios)
}
