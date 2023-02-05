import { mockEventModel } from '@/domain/test'
import { EventCard, Header } from '@/presentation/components'
import { Avatar, Button, Flex, Grid, Heading, Text } from '@chakra-ui/react'

type ProfileProps = {
  any?: any
}

export const Profile: React.FC<ProfileProps> = () => {
  return (
    <Grid minHeight='100vh' width='100%' gridTemplateRows='80px auto' position='relative'>
      <Header />

      <Flex width='100%' maxWidth='75rem' margin='0 auto' padding='1rem' direction='column'>
        <Flex
          width='100%'
          height='250px'
          borderBottom='1px solid'
          borderColor='gray.200'
          gap='1rem'
        >
          <Flex direction='column' gap='1rem'>
            <Avatar
              width='9.375rem'
              height='9.375rem'
              name='Dan Abrahmov'
              src='https://bit.ly/dan-abramov'
            />
            <Button>Alterar imagem</Button>
          </Flex>

          <Flex direction='column' paddingTop='2rem'>
            <Heading size='lg'>Carol Gomes</Heading>
            <Text>carolgomes@gmail.com</Text>
          </Flex>
        </Flex>

        <Flex width='100%' padding='1rem' wrap='wrap'>
          <Flex flex={1} justifyContent='space-between' marginBottom='2rem'>
            <Heading size='lg'>Meus eventos</Heading>
            <Button>Criar evento</Button>
          </Flex>

          <Flex width='100%' gap='1rem' justifyContent='space-between' wrap='wrap'>
            <EventCard width='16.875rem' event={{ ...mockEventModel() }} />
            <EventCard width='16.875rem' event={{ ...mockEventModel() }} />
            <EventCard width='16.875rem' event={{ ...mockEventModel() }} />
            <EventCard width='16.875rem' event={{ ...mockEventModel() }} />
            <EventCard width='16.875rem' event={{ ...mockEventModel() }} />
          </Flex>
        </Flex>
      </Flex>
    </Grid>
  )
}

Profile.displayName = 'Profile'
