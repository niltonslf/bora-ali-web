import { faker } from '@faker-js/faker'

import { MusicStyleModel } from '../models'

export const mockMusicStyleModel = (): MusicStyleModel => ({
  id: faker.datatype.string(),
  name: faker.random.word(),
})

export const mockMusicStyleListModel = (): MusicStyleModel[] => [
  mockMusicStyleModel(),
  mockMusicStyleModel(),
  mockMusicStyleModel(),
]
