import { FirebaseSignIn } from '@/data/protocols/firebase'
import { Authentication, AuthenticationResponse, AuthUser } from '@/domain/usecases'

export class FirebaseAuthentication implements Authentication {
  constructor(
    private readonly firebaseClient: FirebaseSignIn,
    private readonly remoteAuthUser: AuthUser
  ) {}

  async auth(): Promise<AuthenticationResponse> {
    const { user } = await this.firebaseClient.signIn()

    const accessToken = await user.getIdToken()

    const account = await this.remoteAuthUser.create({
      email: user.email as string,
      name: user.displayName as string,
      profilePicture: user.photoURL as string,
      uuid: user.uid,
      accessToken,
    })

    return { account, accessToken }
  }
}
