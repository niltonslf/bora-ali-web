import { useEffect, useState } from 'react'

import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'
import { GoogleMapsLoader, Header } from '@/presentation/components'
import { CustomMaker } from '@/presentation/components/Maps'
import { useErrorHandler } from '@/presentation/hooks'
import { Flex, Grid, Box, Text } from '@chakra-ui/react'
import { GoogleMap } from '@react-google-maps/api'

import { EventError, EventList } from './components'
import { EventMapProvider } from './context/event-map-context'

type EventMapProps = {
  fetchEvent: FetchEvent
}

export const EventMap: React.FC<EventMapProps> = ({ fetchEvent }) => {
  const [events, setEvents] = useState<EventModel[]>([])
  const [coords, setCoords] = useState({ lat: 0, lng: 0 })
  const [error, setError] = useState<string | null>(null)

  const handleError = useErrorHandler((error) => setError(error.message))

  useEffect(() => {
    fetchEvent
      .fetchAll()
      .then((events) => setEvents(events))
      .catch((error) => handleError(error))
  }, [])

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) =>
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      )
  }, [])

  return (
    <EventMapProvider>
      <Grid minHeight='100vh' width='100%' gridTemplateRows='80px auto' position='relative'>
        <Header />
        <Flex position='relative' width='100%' flex-wrap='wrap'>
          <Flex
            flex={1}
            background='white'
            height='100%'
            width='100%'
            padding='1rem'
            flexWrap='wrap'
            alignContent='flex-start'
          >
            <Text textStyle='h1' data-testid='title' marginBottom='1rem'>
              Events found
            </Text>
            {error ? <EventError error={error} /> : <EventList events={events} />}
          </Flex>
          <Box flex={1.5} height='calc(100vh - 80px)' position='sticky' top='80px'>
            <GoogleMapsLoader>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={coords}
                zoom={15}
                options={{
                  fullscreenControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                  zoomControl: false,
                  styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }],
                  disableDoubleClickZoom: true,
                }}
              >
                {events.map((event) => {
                  return <CustomMaker key={event.id} event={event} />
                })}
              </GoogleMap>
            </GoogleMapsLoader>
          </Box>
        </Flex>
      </Grid>
    </EventMapProvider>
  )
}

EventMap.displayName = 'EventMap'
