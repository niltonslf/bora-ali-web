import { MusicStyleModel } from '@/domain/models'

export interface FetchMusicStyle {
  fetchAll: () => Promise<MusicStyleModel[]>
}
