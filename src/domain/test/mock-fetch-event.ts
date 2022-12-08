import { faker } from '@faker-js/faker'

import { EventModel } from '../models'

export const mockEventModel = (): EventModel => ({
  id: Number(faker.random.numeric(3)),
  coords: faker.random.words(),
  description: faker.random.words(),
  image: faker.image.cats(),
  name: faker.name.fullName(),
})

export const mockEventListModel = (): EventModel[] => {
  return [mockEventModel(), mockEventModel()]
}
