import { FirebaseAuthentication } from '@/data/usecases'
import { RemoteAuthUser } from '@/data/usecases/auth-user/remote-auth-user'
import { FirebaseClient } from '@/infra/firebase/firebase-client'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { Login } from '@/presentation/pages'

export const LoginFactory: React.FC = () => {
  const firebaseClient = new FirebaseClient()
  const httpClient = makeAxiosHttpClient()

  const createUser = new RemoteAuthUser(httpClient)
  const authentication = new FirebaseAuthentication(firebaseClient, createUser)

  return <Login authentication={authentication} />
}

LoginFactory.displayName = 'LoginFactory'
