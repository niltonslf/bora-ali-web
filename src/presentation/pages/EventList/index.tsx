/* eslint-disable max-len */
import { useCallback, useState } from 'react'

import { EventCard, Header } from '@/presentation/components'
import { EventCardSkeleton } from '@/presentation/components/EventCard/EventCardSkeleton'
import { Flex, Grid, Box } from '@chakra-ui/react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

type EventListProps = {
  any?: any
}

export const EventList: React.FC<EventListProps> = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  const coords = {
    center: {
      lat: -33.91519386250274,
      lng: 18.420095308767127,
    },
    zoom: 15,
  }

  const [, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    // const bounds = new window.google.maps.LatLngBounds(coords.center)
    // map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
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
        >
          <EventCardSkeleton />
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <EventCard key={card} />
          ))}
        </Grid>
        <Box flex={1.5} height='calc(100vh - 80px)' position='sticky' top='80px'>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={coords.center}
              zoom={coords.zoom}
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
