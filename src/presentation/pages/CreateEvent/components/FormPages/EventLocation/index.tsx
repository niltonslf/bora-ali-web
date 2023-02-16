import { useEffect, useState } from 'react'

import { GoogleMapsLoader } from '@/presentation/components'
import { Flex, Heading, Input } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'
import { Autocomplete, GoogleMap } from '@react-google-maps/api'

export const EventLocation: React.FC = () => {
  const { formState, ...context } = useCreateEventContext()

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

      if (place?.photos && !context.isEdit)
        place?.photos.map((photo) => photos.push(photo.getUrl()))

      const address = place?.formatted_address || ''
      const lat = place?.geometry?.location?.lat() || 0
      const lng = place?.geometry?.location?.lng() || 0

      setCoords({ lat, lng })
      setCenter({ lat, lng })

      context.setFormState((prev) => ({
        ...prev,
        lat,
        lng,
        address,
        name: place?.name || '',
        imagesUrl: [...prev.imagesUrl, ...photos],
      }))
    }
  }

  useEffect(() => {
    if (!map) return
    const marker = new google.maps.Marker({
      position: { lat: Number(coords?.lat), lng: Number(coords?.lng) },
    })

    console.log({ coords })

    marker.setMap(map)

    return () => marker.setMap(null)
  }, [map, coords])

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        setCenter({ lat: coords.latitude, lng: coords.longitude })
      )

    if (
      formState.lat !== undefined &&
      formState.lng !== undefined &&
      formState.address !== undefined
    ) {
      context.setIsNextButtonDisabled(false)
      setCoords({ lat: formState.lat, lng: formState.lng })
    } else context.setIsNextButtonDisabled(true)
  }, [])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-location-title'>
        Onde acontecerá o rolê?
      </Heading>

      <Input hidden readOnly data-testid='event-location-input' value={formState.address} />
      <Input hidden readOnly data-testid='event-lat-input' value={formState.lat} />
      <Input hidden readOnly data-testid='event-lng-input' value={formState.lng} />

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
                defaultValue={formState.address}
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
