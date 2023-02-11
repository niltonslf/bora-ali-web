import { faker } from '@faker-js/faker'

import { EventCreationModel } from '../models'

export const mockEventCreationModel = (): EventCreationModel => ({
  description: faker.random.words(),
  images: faker.datatype.array(2) as any,
  name: faker.name.fullName(),
  address: faker.address.street(),
  lat: Number(faker.address.latitude()),
  lng: Number(faker.address.longitude()),
  startDate: faker.datatype.string(),
  endDate: faker.datatype.string(),
  repeatDays: [],
  imagesUrl: [faker.datatype.string()],
  price: Number(faker.random.numeric()),
  hasMeal: faker.datatype.boolean(),
  userId: faker.random.numeric(),
  placeTypeId: faker.random.numeric(),
  musicStyleId: faker.random.numeric(),
  categories: [faker.random.numeric()],
})

export const mockEventCreationFormDataModel = (): FormData => {
  const data = new FormData()
  const model = mockEventCreationModel()

  for (const key in model) {
    // @ts-expect-error
    data.append(key, model[key])
  }

  return data
}
