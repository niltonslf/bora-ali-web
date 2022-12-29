import { faker } from '@faker-js/faker'

import { PlaceTypeModel } from '../models'

export const mockPlaceTypeModel = (): PlaceTypeModel => ({
  id: faker.random.numeric(),
  name: faker.random.word(),
  description: faker.random.word(),
})

export const mockPlaceTypeListModel = (): PlaceTypeModel[] => {
  return [mockPlaceTypeModel(), mockPlaceTypeModel()]
}
