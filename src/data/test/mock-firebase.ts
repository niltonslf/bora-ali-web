import { FirebaseResponse, FirebaseSignIn } from '@/data/protocols/firebase'
import { faker } from '@faker-js/faker'

export class FirebaseClientSpy implements FirebaseSignIn {
  async signIn(): Promise<FirebaseResponse> {
    return {
      accessToken: faker.datatype.uuid(),
      user: {
        email: faker.internet.email(),
        displayName: faker.name.fullName(),
        photoURL: faker.image.people(),
        uid: faker.datatype.uuid(),
      } as any,
    }
  }
}
