import { faker } from '@faker-js/faker'

import { MusicStyleModel } from '../models'

export const mockMusicStyleModel = (): MusicStyleModel => ({
  id: faker.datatype.string(),
  name: faker.datatype.string(10),
})

export const mockMusicStyleListModel = (): MusicStyleModel[] => [
  mockMusicStyleModel(),
  mockMusicStyleModel(),
  mockMusicStyleModel(),
]
