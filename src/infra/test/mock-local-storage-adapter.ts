import { GetStorage, SetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapterSpy implements SetStorage, GetStorage {
  get(key: string): any {
    return {}
  }

  set(key: string, value: object): void {}
}
