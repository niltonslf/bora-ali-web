import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { UnexpectedError } from '@/data/errors'
import { FirebaseResponse, FirebaseSignIn } from '@/data/protocols/firebase'

export class FirebaseClient implements FirebaseSignIn {
  provider = new GoogleAuthProvider()
  auth = getAuth()

  async signIn(): Promise<FirebaseResponse> {
    try {
      const result = await signInWithPopup(this.auth, this.provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)

      if (!credential?.accessToken) throw new UnexpectedError()

      return {
        user: result.user,
        token: credential.accessToken,
      }
    } catch (error: any) {
      throw new UnexpectedError()
    }
  }
}
