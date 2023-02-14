import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'
import { GoogleMapsLoader, Header } from '@/presentation/components'
import { CustomMaker } from '@/presentation/components/Maps'
import { useErrorHandler } from '@/presentation/hooks'
import { Flex, Box, Text } from '@chakra-ui/react'
import { GoogleMap } from '@react-google-maps/api'

import { EventError, EventList } from './components'
import { EventMapProvider } from './context/event-map-context'
import { useMapArea } from './hooks/use-map-area'

type EventMapProps = {
  fetchEvent: FetchEvent
}

export const EventMap: React.FC<EventMapProps> = ({ fetchEvent }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()

  const [events, setEvents] = useState<EventModel[]>([])
  const [error, setError] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 })
  const [filters, setFilters] = useState({ category: '', placeType: '', musicStyle: '' })

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const { areaInKms } = useMapArea(map, mapCenter)

  const handleError = useErrorHandler((error) => setError(error.message))

  const updateFilters = () => {
    const category = params.get('category')
    const placeType = params.get('place-type')
    const musicStyle = params.get('music-style')

    setFilters((prev) => ({ ...prev, category: category || '' }))
    setFilters((prev) => ({ ...prev, placeType: placeType || '' }))
    setFilters((prev) => ({ ...prev, musicStyle: musicStyle || '' }))
  }

  const updateMapCenter = () => {
    const mapCenter = map?.getCenter()

    if (!mapCenter?.lat() && !mapCenter?.lng()) return
    setMapCenter({ lat: mapCenter?.lat() || 0, lng: mapCenter?.lng() || 0 })
  }

  useEffect(() => {
    updateFilters()
  }, [location])

  useEffect(() => {
    if (!mapCenter.lat && !mapCenter.lng) return
    setIsLoading(true)

    fetchEvent
      .fetchByLocation(mapCenter.lat, mapCenter.lng, areaInKms, filters)
      .then((events) => {
        setEvents(events)
        setError(null)
      })
      .catch(handleError)
      .finally(() => setIsLoading(false))
  }, [mapCenter, filters])

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
      })
  }, [])

  return (
    <EventMapProvider>
      <Flex
        direction='column'
        minHeight='100vh'
        height={{ base: '100vh', md: 'unset' }}
        width='100%'
        position='relative'
      >
        <Header showFilters={true} />

        <Flex
          position='relative'
          width='100%'
          height='100%'
          flex-wrap='wrap'
          flex={{ base: 1, md: 'unset' }}
          flexDirection={{ base: 'column-reverse', md: 'row' }}
        >
          <Flex
            width={{ base: '100%', md: '40vw' }}
            flex={{ base: 'unset', md: 1.8, lg: 1 }}
            background='white'
            height={{ base: '50%', md: '100%' }}
            padding={{ base: '1rem 1rem 0 1rem', md: '1rem' }}
            flexDirection='column'
            alignContent='flex-start'
          >
            <Text textStyle='h1' data-testid='title' marginBottom='1rem' width='100%'>
              {events.length > 0 && <>Rolês encontrados ({events.length})</>}
            </Text>

            {error ? (
              <EventError error={error} />
            ) : (
              <EventList events={events} isLoading={isLoading} />
            )}
          </Flex>

          <Box
            flex={{ base: 'unset', md: 1.5 }}
            width={{ base: '100%', md: 'auto' }}
            height={{ base: '50%', md: 'calc(100vh - 80px)' }}
            position='sticky'
            top='80px'
          >
            <GoogleMapsLoader>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                onLoad={setMap}
                onZoomChanged={updateMapCenter}
                onDragEnd={updateMapCenter}
                zoom={12}
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
                  return (
                    <CustomMaker
                      key={`event-${event.id}`}
                      event={event}
                      onClick={() => navigate(`/event/${event.id}`)}
                    />
                  )
                })}
              </GoogleMap>
            </GoogleMapsLoader>
          </Box>
        </Flex>
      </Flex>
    </EventMapProvider>
  )
}

EventMap.displayName = 'EventMap'
