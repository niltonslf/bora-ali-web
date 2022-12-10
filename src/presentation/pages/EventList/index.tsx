import { useCallback, useState } from 'react'

import { Flex, Grid } from '@chakra-ui/react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

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
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  }

  const [, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(coords.center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  return (
    <Grid height='100vh' width='100vw' gridTemplateRows='100px auto'>
      <header>header</header>
      <Flex background='orange'>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={coords.center}
            zoom={11}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              fullscreenControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              zoomControl: false,
            }}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}
      </Flex>
    </Grid>
  )
}

EventList.displayName = 'EventList'
