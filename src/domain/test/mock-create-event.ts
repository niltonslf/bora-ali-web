import { faker } from '@faker-js/faker'

import { EventCreationModel } from '../models'

export const mockEventCreationModel = (): EventCreationModel => ({
  description: faker.random.words(),
  images: faker.datatype.array(2) as any,
  name: faker.name.fullName(),
  address: faker.address.street(),
  lat: faker.address.latitude(),
  lng: faker.address.longitude(),
  startDate: faker.date.future(10),
  endDate: faker.date.future(10),
  price: faker.random.numeric(2),
  hasMeal: faker.datatype.boolean(),
  userId: faker.random.numeric(),
  placeTypeId: faker.random.numeric(),
  musicStyleId: faker.random.numeric(),
  categories: [faker.random.numeric()],
})
