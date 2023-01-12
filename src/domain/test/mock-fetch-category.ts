import { faker } from '@faker-js/faker'

import { CategoryModel } from '../models'

export const mockCategoryModel = (): CategoryModel => ({
  id: faker.datatype.number(),
  name: faker.datatype.string(10),
})

export const mockCategoryListModel = (): CategoryModel[] => [
  mockCategoryModel(),
  mockCategoryModel(),
  mockCategoryModel(),
]
