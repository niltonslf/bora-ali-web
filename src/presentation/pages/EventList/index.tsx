/* eslint-disable max-len */
import { useCallback, useEffect, useState } from 'react'

import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'
import { EventCard, Header } from '@/presentation/components'
import { EventCardSkeleton } from '@/presentation/components/EventCard/EventCardSkeleton'
import { Flex, Grid, Box } from '@chakra-ui/react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

type EventListProps = {
  fetchEvent: FetchEvent
}

export const EventList: React.FC<EventListProps> = ({ fetchEvent }) => {
  const [events, setEvents] = useState<EventModel[]>([])
  const [coords, setCoords] = useState({ lat: -33.91519386250274, lng: 18.420095308767127 })
  const [, setMap] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  const onLoad = useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  useEffect(() => {
    fetchEvent.fetchAll().then((events) => {
      setEvents(events)
    })
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
      <Flex position='relative' width='100%'>
        <Grid
          flex={1}
          gridTemplateColumns='1fr 1fr'
          background='white'
          height='100%'
          padding='1rem'
          gap={4}
          data-testid='event-list'
        >
          {events.length ? (
            events.map((event, index) => <EventCard event={event} key={index} />)
          ) : (
            <EventCardSkeleton />
          )}
        </Grid>
        <Box flex={1.5} height='calc(100vh - 80px)' position='sticky' top='80px'>
          {isLoaded && (
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
          )}
        </Box>
      </Flex>
    </Grid>
  )
}

EventList.displayName = 'EventList'
