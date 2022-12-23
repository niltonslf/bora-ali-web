import { vi } from 'vitest'

import { FirebaseResponse, FirebaseSignIn } from '@/data/protocols/firebase'
import { faker } from '@faker-js/faker'

export class FirebaseClientSpy implements FirebaseSignIn {
  async signIn(): Promise<FirebaseResponse> {
    return {
      user: {
        email: faker.internet.email(),
        displayName: faker.name.fullName(),
        photoURL: faker.image.people(),
        uid: faker.datatype.uuid(),
        getIdToken: vi.fn(),
      } as any,
      credential: faker.datatype.uuid() as any,
    }
  }
}
