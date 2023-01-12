import { AxiosHttpClient } from '@/infra/http'

import { makeLocalStorageAdapter } from '../cache/local-storage-adapter-factory'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient(makeLocalStorageAdapter())
}
