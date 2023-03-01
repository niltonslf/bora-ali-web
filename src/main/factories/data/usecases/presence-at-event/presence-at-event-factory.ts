import { RemotePresenceAtEvent } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makePresenceAtEventFactory = () => {
  const axios = makeAuthorizeHttpClientDecorator()
  return new RemotePresenceAtEvent(axios)
}
