import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { GoogleMapsLoader } from '@/presentation/components'
import { Flex, Heading, Input } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'
import { createEvent } from '@pages/CreateEvent/context/create-event'
import { Autocomplete, GoogleMap } from '@react-google-maps/api'

export const EventLocation: React.FC = observer(() => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [map, setMap] = useState<google.maps.Map>()

  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete>()

  const onLoad = (autoComplete: google.maps.places.Autocomplete) => {
    setAutoComplete(autoComplete)
  }

  const handlePlaceChanged = () => {
    if (autoComplete !== null) {
      const place = autoComplete?.getPlace()

      const photos: string[] = []

      if (place?.photos && !createEvent.isEdit)
        place?.photos.map((photo) => photos.push(photo.getUrl()))

      const address = place?.formatted_address || ''
      const lat = place?.geometry?.location?.lat() || 0
      const lng = place?.geometry?.location?.lng() || 0

      setCoords({ lat, lng })
      setCenter({ lat, lng })

      createEvent.setFormState({
        ...createEvent.formState,
        lat,
        lng,
        address,
        name: place?.name || '',
        imagesUrl: [...createEvent.formState.imagesUrl, ...photos],
      })
    }
  }

  useEffect(() => {
    if (!map) return
    const marker = new google.maps.Marker({
      position: { lat: Number(coords?.lat), lng: Number(coords?.lng) },
    })

    marker.setMap(map)

    return () => marker.setMap(null)
  }, [map, coords])

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        setCenter({ lat: coords.latitude, lng: coords.longitude })
      )

    setCoords({ lat: createEvent.formState.lat, lng: createEvent.formState.lng })
  }, [])

  useEffect(() => {
    if (
      createEvent.formState.lat !== undefined &&
      createEvent.formState.lng !== undefined &&
      createEvent.formState.address !== undefined
    )
      createEvent.disableNextButton(false)
    else createEvent.disableNextButton(true)
  }, [createEvent.formState.lat, createEvent.formState.lng, createEvent.formState.address])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-location-title'>
        Onde acontecerá o rolê?
      </Heading>

      <Input
        hidden
        readOnly
        data-testid='event-location-input'
        value={createEvent.formState.address}
      />
      <Input hidden readOnly data-testid='event-lat-input' value={createEvent.formState.lat} />
      <Input hidden readOnly data-testid='event-lng-input' value={createEvent.formState.lng} />

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
            zoom={13}
            onLoad={setMap}
            options={{
              fullscreenControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              zoomControl: false,
            }}
          >
            <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChanged}>
              <input
                defaultValue={createEvent.formState.address}
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
})

EventLocation.displayName = 'EventLocation'
