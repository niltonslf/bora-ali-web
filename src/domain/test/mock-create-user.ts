import { faker } from '@faker-js/faker'

import { AccountModel } from '../models'

export const mockAccountModel = (): AccountModel => ({
  uuid: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  profilePicture: faker.image.people(),
})
