import { Authentication, AuthenticationResponse } from '@/domain/usecases'
import { FirebaseClient } from '@/infra/firebase/firebase-client'

import { RemoteCreateUser } from '../create-user/remote-create-user'

export class FirebaseAuthentication implements Authentication {
  constructor(
    private readonly firebaseClient: FirebaseClient,
    private readonly remoteCreateUser: RemoteCreateUser
  ) {}

  async auth(): Promise<AuthenticationResponse> {
    const { user, token } = await this.firebaseClient.signIn()

    const account = await this.remoteCreateUser.create({
      email: user.email as string,
      name: user.displayName as string,
      profile_picture: user.photoURL as string,
      uuid: user.uid,
    })

    return { token, user: account }
  }
}
