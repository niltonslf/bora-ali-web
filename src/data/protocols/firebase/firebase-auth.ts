import { User } from 'firebase/auth'

export type FirebaseResponse = {
  user: User
  token: string
}

export interface FirebaseSignIn {
  signIn: () => Promise<FirebaseResponse>
}
