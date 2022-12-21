import { User } from 'firebase/auth'

export type FirebaseResponse = {
  user: User
  accessToken: string
}

export interface FirebaseSignIn {
  signIn: () => Promise<FirebaseResponse>
}
