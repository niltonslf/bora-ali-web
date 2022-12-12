import { Link } from 'react-router-dom'

import { BoraAli, Google } from '@/presentation/components'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'

type LoginProps = {
  any?: any
}

export const Login: React.FC<LoginProps> = () => {
  return (
    <Flex width='100vw' height='100vh'>
      <Flex flexDirection='column' flex={2} justifyContent='center' alignItems='center'>
        <BoraAli width='10rem' height='auto' marginBottom='5rem' />

        <Box width='80%'>
          <Text textStyle='h3'>Welcome</Text>
          <Text textStyle='label'>Lorem, ipsum dolor sit amet consectetur.</Text>

          <Flex width='100%' marginTop='2rem' flexDirection='column' gap='1rem'>
            <Link to='/'>
              <Button
                justifyContent='flex-start'
                width='100%'
                border='1px solid #787575'
                background='white'
                position='relative'
              >
                <Google height='25px' width='auto' />
                <Flex
                  position='absolute'
                  top='0'
                  left='0'
                  width='100%'
                  height='100%'
                  alignItems='center'
                  justifyContent='center'
                >
                  Continue with google
                </Flex>
              </Button>
            </Link>
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
