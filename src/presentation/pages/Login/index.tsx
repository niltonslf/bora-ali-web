import { useNavigate } from 'react-router-dom'

import { Authentication } from '@/domain/usecases'
import { BoraAli, Google } from '@/presentation/components'
import { Box, Flex, Image, Text } from '@chakra-ui/react'

import { AuthButton } from './components'

type LoginProps = {
  authentication: Authentication
}

export const Login: React.FC<LoginProps> = ({ authentication }) => {
  const navigate = useNavigate()

  const login = async () => {
    const { accessToken, user } = await authentication.auth()

    console.log({ user })
    console.log({ accessToken })

    navigate('/')
  }

  return (
    <Flex width='100vw' height='100vh'>
      <Flex flexDirection='column' flex={2} justifyContent='center' alignItems='center'>
        <BoraAli width='10rem' height='auto' marginBottom='5rem' />

        <Box width='80%'>
          <Text textStyle='h3'>Welcome</Text>
          <Text textStyle='label'>Choose one of the methods bellow to sign in.</Text>

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
