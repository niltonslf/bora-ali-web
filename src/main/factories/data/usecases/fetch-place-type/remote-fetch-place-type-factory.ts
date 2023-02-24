import { RemoteFetchPlaceType } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteFetchPlaceType = () => {
  const axios = makeAuthorizeHttpClientDecorator()
  return new RemoteFetchPlaceType(axios)
}
