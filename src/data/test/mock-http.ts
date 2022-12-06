import { faker } from '@faker-js/faker'

import { HttpGetParams } from '../protocols/http/http-get-client'

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.avatar(),
  header: JSON.parse(faker.datatype.json()),
})
