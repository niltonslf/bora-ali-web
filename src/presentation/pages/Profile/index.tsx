import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'
import { EventCard, Header } from '@/presentation/components'
import { AuthContext } from '@/presentation/context'
import { Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react'

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
    <Flex minHeight='100%' width='100%' direction='column' position='relative'>
      <Header />

      <Flex maxWidth='100%' width='75rem' margin='0 auto' padding='1rem' direction='column'>
        <Flex
          width='100%'
          height='200px'
          borderBottom='1px solid'
          borderColor='gray.200'
          gap='1rem'
        >
          <Flex direction='column' gap='1rem'>
            <Avatar
              data-testid='user-avatar'
              width='9.375rem'
              height='9.375rem'
              name={account.name}
              src={account.profilePicture}
            />
          </Flex>

          <Flex direction='column' paddingTop='2rem'>
            <Heading size='lg' data-testid='user-name'>
              {account.name}
            </Heading>
            <Text data-testid='user-email'>{account.email}</Text>
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
            gap='1rem'
            wrap='wrap'
            data-testid='event-list'
            flexDirection={{ base: 'column', md: 'row' }}
          >
            {events.length > 0 ? (
              <>
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    width={{ base: '100%', md: '16.875rem' }}
                    event={event}
                  />
                ))}
              </>
            ) : (
              <Box>Nenhum rolê encontrado.</Box>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

Profile.displayName = 'Profile'
