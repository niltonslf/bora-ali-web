import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Authentication } from '@/domain/usecases'
import { BoraAli, Google } from '@/presentation/components'
import { AuthContext } from '@/presentation/context/auth/auth-context'
import { Box, Flex, Image, Text } from '@chakra-ui/react'

import { AuthButton } from './components'

type LoginProps = {
  authentication: Authentication
}

export const Login: React.FC<LoginProps> = ({ authentication }) => {
  const navigate = useNavigate()
  const authProvider = useContext(AuthContext)

  const login = async () => {
    const account = await authentication.auth()

    if (account) authProvider.setCurrentAccount(account)

    navigate('/')
  }

  return (
    <Flex width='100vw' height='100vh'>
      <Flex flexDirection='column' flex={2} justifyContent='center' alignItems='center'>
        <BoraAli width='10rem' height='auto' marginBottom='5rem' />

        <Box width='80%'>
          <Text textStyle='h3' data-testid='title'>
            Bem-vindo
          </Text>
          <Text textStyle='label'>Escolha uma das formas abaixo para entrar.</Text>

          <Flex width='100%' marginTop='2rem' flexDirection='column' gap='1rem'>
            <AuthButton
              data-testid='google-button'
              icon={<Google height='25px' width='auto' />}
              label='Continuar com google'
              onClick={login}
            />
          </Flex>
        </Box>
      </Flex>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        background='black'
        flex={4}
        position='relative'
        _after={{
          content: '" "',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <Image src='/assets/login/background.jpg' width='100%' height='100%' objectFit='cover' />
      </Flex>
    </Flex>
  )
}

Login.displayName = 'Login'
