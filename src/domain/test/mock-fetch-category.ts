import { faker } from '@faker-js/faker'

import { CategoryModel } from '../models'

export const mockCategoryModel = (): CategoryModel => ({
  id: faker.datatype.string(),
  name: faker.datatype.string(10),
})

export const mockCategoryListModel = (): CategoryModel[] => [
  mockCategoryModel(),
  mockCategoryModel(),
  mockCategoryModel(),
]
