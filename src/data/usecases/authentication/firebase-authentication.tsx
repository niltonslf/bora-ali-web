import { FirebaseSignIn } from '@/data/protocols/firebase'
import { Authentication, AuthenticationResponse, CreateUser } from '@/domain/usecases'

export class FirebaseAuthentication implements Authentication {
  constructor(
    private readonly firebaseClient: FirebaseSignIn,
    private readonly remoteCreateUser: CreateUser
  ) {}

  async auth(): Promise<AuthenticationResponse> {
    const { user, accessToken } = await this.firebaseClient.signIn()

    const account = await this.remoteCreateUser.create({
      email: user.email as string,
      name: user.displayName as string,
      profile_picture: user.photoURL as string,
      uuid: user.uid,
    })

    return { accessToken, user: account }
  }
}
