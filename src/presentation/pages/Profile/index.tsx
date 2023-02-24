import { useContext, useEffect, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { FetchEvent, PersistEvent } from '@/domain/usecases'
import { EventCard, Header } from '@/presentation/components'
import { AuthContext } from '@/presentation/context'
import { useErrorHandler } from '@/presentation/hooks'
import { Alert, Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react'

type ProfileProps = {
  fetchEvent: FetchEvent
  persistEvent: PersistEvent
}

export const Profile: React.FC<ProfileProps> = ({ fetchEvent, persistEvent }) => {
  const navigate = useNavigate()
  const { getCurrentAccount } = useContext(AuthContext)

  const handleError = useErrorHandler(() => null)

  const account = getCurrentAccount()

  const [events, setEvents] = useState<EventModel[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteEvent = async (eventId: string) => {
    setIsLoading(true)
    await persistEvent.deleteById(eventId)
    fetchData()
    setIsLoading(false)
  }

  const fetchData = () => {
    if (account?.id) {
      fetchEvent.fetchByUserId(account?.id).then(setEvents).catch(handleError)
    }
  }
  useEffect(fetchData, [])

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
            width='100%'
            gap='1rem'
            flexWrap='wrap'
            data-testid='event-list'
            flexDirection={{ base: 'column', md: 'row' }}
          >
            {events.length > 0 ? (
              <>
                {events.map((event) => (
                  <Box key={event.id} position='relative'>
                    <EventCard width={{ base: '100%', md: '16.875rem' }} event={event} />
                    <Flex position='absolute' top='0.5rem' right='0.5rem' gap='0.5rem'>
                      <Button
                        colorScheme='red'
                        onClick={async () => await handleDeleteEvent(event.id)}
                        size='sm'
                        isLoading={isLoading}
                      >
                        <FaTrash />
                      </Button>

                      <Button colorScheme='blue' as='a' href={`/edit-event/${event.id}`} size='sm'>
                        <FaPen />
                      </Button>
                    </Flex>
                  </Box>
                ))}
              </>
            ) : (
              <Alert width='100%'>Nenhum rolê encontrado.</Alert>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

Profile.displayName = 'Profile'
