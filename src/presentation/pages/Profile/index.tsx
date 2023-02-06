import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'
import { EventCard, Header } from '@/presentation/components'
import { AuthContext } from '@/presentation/context'
import { Avatar, Box, Button, Flex, Grid, Heading, Text } from '@chakra-ui/react'

type ProfileProps = {
  fetchEvent: FetchEvent
}

export const Profile: React.FC<ProfileProps> = ({ fetchEvent }) => {
  const navigate = useNavigate()
  const { getCurrentAccount } = useContext(AuthContext)

  const account = getCurrentAccount()

  const [events, setEvents] = useState<EventModel[]>([])

  useEffect(() => {
    if (account?.id) {
      fetchEvent.fetchByUserId(account?.id).then(setEvents)
    }
  }, [])

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
              data-testid='user-avatar'
              width='9.375rem'
              height='9.375rem'
              name='Dan Abrahmov'
              src='https://bit.ly/dan-abramov'
            />
            <Button>Alterar imagem</Button>
          </Flex>

          <Flex direction='column' paddingTop='2rem'>
            <Heading size='lg' data-testid='user-name'>
              Carol Gomes
            </Heading>
            <Text data-testid='user-email'>carolgomes@gmail.com</Text>
          </Flex>
        </Flex>

        <Flex width='100%' padding='1rem' wrap='wrap'>
          <Flex flex={1} justifyContent='space-between' marginBottom='2rem'>
            <Heading size='lg'>Meus rolês</Heading>

            <Button onClick={() => navigate('/create-event')} data-testid='create-event-btn'>
              Criar rolê
            </Button>
          </Flex>

          <Flex
            width='100%'
            gap='1rem'
            justifyContent='space-between'
            wrap='wrap'
            data-testid='event-list'
          >
            {events.length > 0 ? (
              <>
                {events.map((event) => (
                  <EventCard key={event.id} width='16.875rem' event={event} />
                ))}
              </>
            ) : (
              <Box>Nenhum rolê encontrado.</Box>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Grid>
  )
}

Profile.displayName = 'Profile'
