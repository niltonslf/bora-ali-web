import { AccountModel } from '@/domain/models'
import { Authentication } from '@/domain/usecases'
import { FirebaseClient } from '@/infra/firebase/firebase-client'

import { RemoteCreateUser } from '../create-user/remote-create-user'

export class FirebaseAuthentication implements Authentication {
  constructor(
    private readonly firebaseClient: FirebaseClient,
    private readonly remoteCreateUser: RemoteCreateUser
  ) {}

  async auth(): Promise<AccountModel> {
    const { user } = await this.firebaseClient.signIn()

    const account = await this.remoteCreateUser.create({
      email: user.email as string,
      name: user.displayName as string,
      profile_picture: user.photoURL as string,
      uuid: user.uid,
    })

    return account
  }
}
