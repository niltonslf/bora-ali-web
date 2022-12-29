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
  lat: faker.address.latitude(),
  lng: faker.address.longitude(),
  startDate: faker.date.future(10),
  endDate: faker.date.future(10),
  price: faker.random.numeric(2),
  hasMeal: faker.datatype.boolean(),
  placeType: {
    id: faker.random.numeric(),
    name: faker.random.word(),
    description: faker.random.word(),
  },
  musicalStyle: {
    id: faker.random.numeric(),
    name: faker.random.word(),
  },
  categories: [
    {
      id: faker.random.numeric(),
      name: faker.random.word(),
    },
  ],
})

export const mockEventListModel = (): EventModel[] => {
  return [mockEventModel(), mockEventModel()]
}
