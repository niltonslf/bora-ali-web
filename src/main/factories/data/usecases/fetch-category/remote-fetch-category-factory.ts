import { RemoteFetchCategory } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteFetchCategory = () => {
  const axios = makeAuthorizeHttpClientDecorator()
  return new RemoteFetchCategory(axios)
}
