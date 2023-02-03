import { useEffect, useState } from 'react'

import { GoogleMapsLoader } from '@/presentation/components'
import { Flex, Heading, Input } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'
import { Autocomplete, GoogleMap, Marker } from '@react-google-maps/api'

export const EventLocation: React.FC = () => {
  const context = useCreateEventContext()

  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [location, setLocation] = useState({ address: '', lat: 0, lng: 0 })

  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete>()

  const onLoad = (autoComplete: google.maps.places.Autocomplete) => {
    setAutoComplete(autoComplete)
  }

  const handlePlaceChanged = () => {
    if (autoComplete !== null) {
      const place = autoComplete?.getPlace()

      const address = place?.formatted_address || ''
      const lat = place?.geometry?.location?.lat() || 0
      const lng = place?.geometry?.location?.lng() || 0

      setLocation({ address, lat, lng })
      setCoords({ lat, lng })
      setCenter({ lat, lng })
    }
  }

  useEffect(() => {
    context.setFormState((prev) => ({ ...prev, ...location }))
  }, [location])

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) =>
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      )

    setLocation({
      address: context.formState.address,
      lat: context.formState.lat,
      lng: context.formState.lng,
    })
  }, [])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-location-title'>
        Onde acontecerá o rolê?
      </Heading>

      <Input hidden readOnly data-testid='event-location-input' value={location.address} />
      <Input hidden readOnly data-testid='event-lat-input' value={location.lat} />
      <Input hidden readOnly data-testid='event-lng-input' value={location.lng} />

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
