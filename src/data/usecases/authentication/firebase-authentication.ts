import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { AccountModel } from '@/domain/models'
import { Authentication } from '@/domain/usecases'

export class FirebaseAuthentication implements Authentication {
  provider = new GoogleAuthProvider()

  async auth(): Promise<AccountModel> {
    const auth = getAuth()
    try {
      const result = await signInWithPopup(auth, this.provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)

      if (credential) {
        const token = credential.accessToken
        const user = result.user
        console.log({ token })
        console.log({ user })
      }
    } catch (error: any) {
      const credential = GoogleAuthProvider.credentialFromError(error)
      Object.assign(error, { credential })

      throw error
    }
  }
}
