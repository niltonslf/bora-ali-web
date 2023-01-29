import { useEffect, useState } from 'react'
import { debounce } from 'ts-debounce'

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
  const [error, setError] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 })
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [areaInKms, setAreaInKms] = useState(1)

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const handleError = useErrorHandler((error) => setError(error.message))

  const onCenterChanged = () => {
    const mapCenter = map?.getCenter()

    if (!mapCenter?.lat() && !mapCenter?.lng()) return

    const updateCenter = debounce(() => {
      setCenter({ lat: mapCenter?.lat() || 0, lng: mapCenter?.lng() || 0 })
    }, 500)

    updateCenter()
  }

  useEffect(() => {
    if (!window?.google || !map) return

    const bounds = map?.getBounds()

    const coords = [
      { lat: bounds?.getNorthEast().lat(), lng: bounds?.getNorthEast().lng() },
      { lat: bounds?.getSouthWest().lat(), lng: bounds?.getNorthEast().lng() },
      { lat: bounds?.getSouthWest().lat(), lng: bounds?.getSouthWest().lng() },
      { lat: bounds?.getNorthEast().lat(), lng: bounds?.getSouthWest().lng() },
    ]

    const polygon = new google.maps.Polygon({ paths: coords })

    const area = google.maps.geometry?.spherical.computeArea(polygon.getPath())
    setAreaInKms(Math.sqrt(area) / 1000 / 2)
  }, [center])

  useEffect(() => {
    if (!center.lat && !center.lng) return
    setIsLoading(true)
    fetchEvent
      .fetchByLocation(center.lat, center.lng, areaInKms)
      .then((events) => {
        setEvents(events)
        setError(null)
      })
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false))
  }, [center])

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })

        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
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
              {events.length > 0 && <>Events found ({events.length})</>}
            </Text>
            {error ? (
              <EventError error={error} />
            ) : (
              <EventList events={events} isLoading={isLoading} />
            )}
          </Flex>

          <Box flex={1.5} height='calc(100vh - 80px)' position='sticky' top='80px'>
            <GoogleMapsLoader>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                onCenterChanged={onCenterChanged}
                onLoad={setMap}
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
                  return <CustomMaker key={`event-${event.id}`} event={event} />
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
