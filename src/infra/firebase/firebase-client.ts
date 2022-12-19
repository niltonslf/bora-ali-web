import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { UnexpectedError } from '@/data/errors'
import { FirebaseResponse, FirebaseSignIn } from '@/data/protocols/firebase'

export class FirebaseClient implements FirebaseSignIn {
  provider = new GoogleAuthProvider()

  async signIn(): Promise<FirebaseResponse> {
    const auth = getAuth()
    try {
      const result = await signInWithPopup(auth, this.provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)

      if (!credential?.accessToken) throw new UnexpectedError()

      return {
        user: result.user,
        token: credential.accessToken,
      }
    } catch (error: any) {
      const credential = GoogleAuthProvider.credentialFromError(error)
      Object.assign(error, { credential })

      throw error
    }
  }
}
