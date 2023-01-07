import { faker } from '@faker-js/faker'

import { EventModel } from '../models'
import { mockAccountModel } from './mock-create-user'

export const mockEventModel = (): EventModel => ({
  id: Number(faker.random.numeric(3)),
  description: faker.random.words(),
  images: [{ image: faker.image.cats() }],
  name: faker.name.fullName(),
  address: faker.address.street(),
  user: mockAccountModel(),
  lat: Number(faker.address.latitude()),
  lng: Number(faker.address.longitude()),
  startDate: faker.datatype.number(),
  endDate: faker.datatype.number(),
  price: faker.datatype.number(),
  hasMeal: faker.datatype.boolean(),
  placeType: {
    id: faker.random.numeric(),
    name: faker.random.word(),
    description: faker.random.word(),
  },
  musicalStyle: {
    id: faker.datatype.number(),
    name: faker.random.word(),
  },
  categories: [
    {
      id: faker.datatype.number(),
      name: faker.random.word(),
    },
  ],
})

export const mockEventListModel = (): EventModel[] => {
  return [mockEventModel(), mockEventModel()]
}
