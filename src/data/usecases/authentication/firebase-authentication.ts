import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { UnexpectedError } from '@/data/errors'
import { AccountModel } from '@/domain/models'
import { Authentication } from '@/domain/usecases'

export class FirebaseAuthentication implements Authentication {
  provider = new GoogleAuthProvider()

  async auth(): Promise<AccountModel> {
    const auth = getAuth()
    try {
      const result = await signInWithPopup(auth, this.provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)

      if (!credential) throw new UnexpectedError()

      const token = credential.accessToken
      console.log({ token })

      const user = result.user
      console.log({ user })

      // create user in the backend

      return {
        email: '',
        name: '',
        profile_picture: '',
        uuid: '',
      }
    } catch (error: any) {
      const credential = GoogleAuthProvider.credentialFromError(error)
      Object.assign(error, { credential })

      throw error
    }
  }
}
