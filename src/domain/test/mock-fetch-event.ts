import { faker } from '@faker-js/faker'

import { EventModel } from '../models'
import { mockAccountModel } from './mock-create-user'

export const mockEventModel = (): EventModel => ({
  id: faker.datatype.string(),
  description: faker.random.words(),
  images: [{ image: faker.image.cats() }],
  name: faker.name.fullName(),
  address: faker.address.street(),
  user: mockAccountModel(),
  lat: Number(faker.address.latitude()),
  lng: Number(faker.address.longitude()),
  startDate: faker.datatype.string(),
  endDate: faker.datatype.string(),
  repeatDays: [faker.datatype.string()],
  price: faker.datatype.string(),
  hasMeal: faker.datatype.boolean(),
  placeType: {
    id: faker.random.numeric(),
    name: faker.random.word(),
    description: faker.random.word(),
  },
  musicStyle: {
    id: faker.datatype.string(),
    name: faker.random.word(),
  },
  categories: [
    {
      id: faker.datatype.string(),
      name: faker.random.word(),
    },
  ],
})

export const mockEventListModel = (): EventModel[] => {
  return [mockEventModel(), mockEventModel()]
}
