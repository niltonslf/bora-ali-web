import { MusicStyleModel } from '@/domain/models'
import { mockMusicStyleListModel } from '@/domain/test'
import { FetchMusicStyle } from '@/domain/usecases'

export class RemoteFetchMusicStyleSpy implements FetchMusicStyle {
  callsCount = 0
  response = mockMusicStyleListModel()

  async fetchAll(): Promise<MusicStyleModel[]> {
    this.callsCount++
    return this.response
  }
}
