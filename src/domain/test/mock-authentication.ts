import { faker } from '@faker-js/faker'

import { mockAccountModel } from './mock-create-user'

export const mockAuthenticationResponse = {
  user: mockAccountModel(),
  accessToken: faker.datatype.uuid(),
}
