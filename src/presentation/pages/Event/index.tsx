import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'
import { GoogleMapsLoader, Header } from '@/presentation/components'
import { Box, Divider, Flex, Heading, List, ListItem, Text } from '@chakra-ui/react'
import { GoogleMap, Marker } from '@react-google-maps/api'

import { Gallery } from './components'

type EventProps = {
  fetchEvent: FetchEvent
}

export const Event: React.FC<EventProps> = ({ fetchEvent }) => {
  const { eventId } = useParams()

  const [event, setEvent] = useState<EventModel>(null as any)

  useEffect(() => {
    if (eventId) fetchEvent.fetchById(eventId).then((event) => setEvent(event))
  }, [eventId])

  if (!event) return <></>

  return (
    <Flex width='100%' flexFlow='row wrap'>
      <Header />
      <Flex flexFlow='row wrap' width='75rem' maxWidth='100%' margin='0 auto' paddingY='2rem'>
        <Box width='100%' data-testid='title-section'>
          <Heading size='md'>{event.name}</Heading>
          <Flex gap='1rem' width='100%' textStyle='label'>
            <Text>{event.address}</Text>
            <Text>
              {event.startDate} - {event.endDate}
            </Text>
          </Flex>
        </Box>

        <Gallery />

        <Flex marginTop='1rem' data-testid='description-section'>
          <Text>{event.description}</Text>
        </Flex>

        <Divider marginY='1rem' />

        <Flex flexFlow='row wrap' data-testid='options-section'>
          <Heading size='md' width='100%' marginBottom='1rem'>
            What you are going to find here
          </Heading>
          <List>
            <ListItem>Pool</ListItem>
            <ListItem>Free drink</ListItem>
            <ListItem>Beach</ListItem>
            <ListItem>Open Air</ListItem>
            <ListItem>Music</ListItem>
          </List>
        </Flex>

        <Divider marginY='1rem' />

        <Flex flexFlow='row wrap' width='100%' data-testid='map-section'>
          <Heading size='md' width='100%' marginBottom='1rem'>
            Where will be
          </Heading>
          <Flex width='100%' height='20rem'>
            <GoogleMapsLoader>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={{ lat: Number(event.lat), lng: Number(event.lng) }}
                zoom={15}
                options={{
                  fullscreenControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                  zoomControl: false,
                }}
              >
                <Marker
                  title={event.name}
                  position={{ lat: Number(event.lat), lng: Number(event.lng) }}
                />
              </GoogleMap>
            </GoogleMapsLoader>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

Event.displayName = 'Event'
