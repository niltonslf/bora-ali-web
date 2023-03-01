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
  startTime: faker.datatype.string(),
  endTime: faker.datatype.string(),
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
  isPrivate: faker.datatype.boolean(),
  participants: [
    {
      email: faker.internet.email(),
      id: faker.random.numeric(),
      name: faker.name.fullName(),
      profilePicture: faker.image.imageUrl(),
      uuid: faker.datatype.uuid(),
    },
  ],
})

export const mockEventListModel = (): EventModel[] => {
  return [mockEventModel(), mockEventModel()]
}
