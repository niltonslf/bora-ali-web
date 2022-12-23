import { OAuthCredential, User } from 'firebase/auth'

export type FirebaseResponse = {
  user: User
  credential: OAuthCredential
}

export interface FirebaseSignIn {
  signIn: () => Promise<FirebaseResponse>
}
