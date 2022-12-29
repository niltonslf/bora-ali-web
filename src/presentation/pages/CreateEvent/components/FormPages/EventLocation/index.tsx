import { useEffect, useState } from 'react'

import { GoogleMapsLoader } from '@/presentation/components'
import { Flex, Heading, Input } from '@chakra-ui/react'
import { Autocomplete, GoogleMap, Marker } from '@react-google-maps/api'

import { useCreateEventContext } from '../../../context/create-event-context'
import { FormContainer } from '../../FormContainer'

export const EventLocation: React.FC = () => {
  const context = useCreateEventContext()

  const [center, setCenter] = useState({ lat: -33.91519386250274, lng: 18.420095308767127 })
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [, setMap] = useState<google.maps.Map | null>(null)

  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete>()

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map)
  }

  const onLoad = (autoComplete: google.maps.places.Autocomplete) => {
    setAutoComplete(autoComplete)
  }

  const handlePlaceChanged = () => {
    if (autoComplete !== null) {
      const place = autoComplete?.getPlace()

      const lat = place?.geometry?.location?.lat() || 0
      const lng = place?.geometry?.location?.lng() || 0

      context.setFormState((prev) => ({ ...prev, address: place?.formatted_address || '' }))
      setCoords({ lat, lng })
      setCenter({ lat, lng })

      context.setFormState((prev) => ({ ...prev, lat: lat.toString(), lng: lng.toString() }))
    }
  }

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) =>
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      )
  }, [])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-location-title'>
        Onde acontecerá o rolê?
      </Heading>
      <Input
        hidden
        placeholder='Address'
        data-testid='event-location-input'
        value={context.formState.address ?? ''}
        onChange={(event) =>
          context.setFormState((prev) => ({ ...prev, address: event.target.value }))
        }
      />
      <Flex
        width='100%'
        marginTop='2rem'
        gap='1rem'
        height='380px'
        borderRadius='1rem'
        overflow='hidden'
        data-testid='event-map'
      >
        <GoogleMapsLoader>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            onLoad={onMapLoad}
            zoom={15}
            options={{
              fullscreenControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              zoomControl: false,
            }}
          >
            {coords && <Marker title='Event place' position={coords} />}

            <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChanged}>
              <input
                data-testid='event-address-input'
                type='text'
                placeholder='Enter the address'
                style={{
                  boxSizing: 'border-box',
                  border: '1px solid transparent',
                  borderRadius: '0.5rem',
                  width: 'calc(100% - 2rem)',
                  height: '40px',
                  padding: '0 12px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                  fontSize: '14px',
                  outline: 'none',
                  position: 'absolute',
                  left: '0',
                  margin: '1rem',
                }}
              />
            </Autocomplete>
          </GoogleMap>
        </GoogleMapsLoader>
      </Flex>
    </FormContainer>
  )
}

EventLocation.displayName = 'EventLocation'
