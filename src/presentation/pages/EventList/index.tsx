/* eslint-disable max-len */
import { useCallback, useState } from 'react'

import { SearchIcon } from '@chakra-ui/icons'
import {
  Flex,
  Grid,
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Heading,
  Box,
  Avatar,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react'
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
      <Flex
        alignItems='center'
        as='header'
        borderBottom='1px'
        borderColor='gray.200'
        position='sticky'
        top={0}
        left={0}
        background='white'
        padding='1rem'
        zIndex='modal'
        justifyContent='space-between'
      >
        <a href='/'>
          <Image src='/assets/images/borali-brand.png' title='brand' height='50px' />
        </a>

        <Box width='500px'>
          <InputGroup>
            <InputRightElement pointerEvents='none'>
              <SearchIcon color='gray.300' />
            </InputRightElement>
            <Input type='tel' placeholder='Find here what you wanna do' />
          </InputGroup>
        </Box>

        <Flex
          border='1px'
          borderRadius='30px'
          borderColor='gray.300'
          alignItems='center'
          gap={2}
          padding='4px 8px'
        >
          <Text textStyle='label'>Lucy smith</Text>
          <Avatar src='/temp/images/profile.jpeg' width='30px' height='30px' />
        </Flex>
      </Flex>
      <Flex position='relative' width='100%'>
        <Grid
          flex={1}
          gridTemplateColumns='1fr 1fr'
          background='white'
          height='100%'
          padding='1rem'
          gap={4}
        >
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <Card key={card} boxShadow='none'>
              <CardBody padding={0}>
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Stack mt='2'>
                  <Heading size='sm'>Living room Sofa</Heading>
                  <Text noOfLines={2} textStyle='paragraph'>
                    This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy
                    toned spaces and for people
                  </Text>
                </Stack>
              </CardBody>
            </Card>
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
