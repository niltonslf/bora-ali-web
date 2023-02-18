import { faker } from '@faker-js/faker'

import { CategoryModel } from '../models'

export const mockCategoryModel = (): CategoryModel => ({
  id: faker.random.word(),
  name: faker.random.word(),
})

export const mockCategoryListModel = (): CategoryModel[] => [
  mockCategoryModel(),
  mockCategoryModel(),
  mockCategoryModel(),
]
