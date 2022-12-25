/* eslint-disable max-len */
import { useCallback, useEffect, useState } from 'react'

import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'
import { GoogleMapsLoader, Header } from '@/presentation/components'
import { Flex, Grid, Box, Text } from '@chakra-ui/react'
import { GoogleMap, Marker } from '@react-google-maps/api'

import { EventError, EventList } from './components'

type EventMapProps = {
  fetchEvent: FetchEvent
}

export const EventMap: React.FC<EventMapProps> = ({ fetchEvent }) => {
  const [events, setEvents] = useState<EventModel[]>([])
  const [coords, setCoords] = useState({ lat: -33.91519386250274, lng: 18.420095308767127 })
  const [error, setError] = useState(null)
  const [, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  useEffect(() => {
    fetchEvent
      .fetchAll()
      .then((events) => setEvents(events))
      .catch((error) => setError(error.message))
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
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
              }}
            >
              <Marker
                title='Event'
                position={{ lat: -33.91519386250274, lng: 18.420095308767127 }}
              ></Marker>
            </GoogleMap>
          </GoogleMapsLoader>
        </Box>
      </Flex>
    </Grid>
  )
}

EventMap.displayName = 'EventMap'
