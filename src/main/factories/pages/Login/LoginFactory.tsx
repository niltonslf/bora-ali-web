import { FirebaseAuthentication } from '@/data/usecases'
import { RemoteCreateUser } from '@/data/usecases/create-user/remote-create-user'
import { FirebaseClient } from '@/infra/firebase/firebase-client'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { Login } from '@/presentation/pages'

export const LoginFactory: React.FC = () => {
  const firebaseClient = new FirebaseClient()
  const httpClient = new AxiosHttpClient()

  const createUser = new RemoteCreateUser('/user', httpClient)
  const authentication = new FirebaseAuthentication(firebaseClient, createUser)

  return <Login authentication={authentication} />
}

LoginFactory.displayName = 'LoginFactory'
