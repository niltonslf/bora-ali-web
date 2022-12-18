import { FirebaseAuthentication } from '@/data/usecases'
import { Login } from '@/presentation/pages'

export const LoginFactory: React.FC = () => {
  const authentication = new FirebaseAuthentication()

  return <Login authentication={authentication} />
}

LoginFactory.displayName = 'LoginFactory'
