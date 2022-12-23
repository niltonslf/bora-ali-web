import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { AxiosHttpClient } from '@/infra/http'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  const localStorageAdapter = new LocalStorageAdapter()
  return new AxiosHttpClient(localStorageAdapter)
}
