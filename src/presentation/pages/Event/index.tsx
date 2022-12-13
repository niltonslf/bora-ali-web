import { Header } from '@/presentation/components'
import { Box, Divider, Flex, Heading, List, ListItem, Text } from '@chakra-ui/react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import { Gallery } from './components'

type EventProps = {
  any?: any
}

export const Event: React.FC<EventProps> = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  return (
    <Flex width='100%' flexFlow='row wrap'>
      <Header />
      <Flex flexFlow='row wrap' width='75rem' maxWidth='100%' margin='0 auto' paddingY='2rem'>
        <Box width='100%'>
          <Heading size='md'>Universo paralelo 2023</Heading>
          <Flex gap='1rem' width='100%' textStyle='label'>
            <Text>Praia do retiro, Bahia, Brazil</Text>
            <Text>22/01/2023 - 01/03/203</Text>
          </Flex>
        </Box>

        <Gallery />

        <Flex marginTop='1rem'>
          <Text>
            Id molestiae reprehenderit ut deleniti laboriosam ut recusandae saepe et repellendus
            sunt est rerum amet! Aut totam aliquid eum dolorem quis cum labore enim est nostrum
            atque ea esse iusto et tempore asperiores a exercitationem inventore. Et iure sequi est
            quaerat suscipit qui voluptatem galisum non assumenda repudiandae qui sunt ipsam ut
            excepturi animi eos inventore quos! Et dolor dolores qui error ullam id dicta provident
            ad facilis culpa est voluptas <br />
            <br />
            aliquid ut Quis molestiae aut doloribus illum. Qui nostrum corporis ut perferendis quia
            est pariatur enim 33 quia incidunt cum repellat temporibus. Qui nemo quibusdam est quasi
            quis et aspernatur cupiditate et provident cupiditate 33 quos mollitia et aspernatur
            eaque et laudantium ullam. 33 molestiae optio in accusamus quam qui quos atque. Ea vero
            mollitia ea dolores accusantium et rerum facere.
            <br />
            <br /> Id dolorem enim ad molestias deserunt aut sunt itaque. A minus dolorem in quaerat
            molestiae et reprehenderit voluptatum et provident excepturi et fugiat tempora aut quia
            facere. Qui eligendi perferendis sit voluptatum delectus in quod recusandae.
          </Text>
        </Flex>

        <Divider marginY='1rem' />

        <Flex flexFlow='row wrap'>
          <Heading size='md' width='100%' marginBottom='1rem'>
            What you are going to find here
          </Heading>
          <List>
            <ListItem>Pool</ListItem>
            <ListItem>Free drink</ListItem>
            <ListItem>Beach</ListItem>
            <ListItem>Open Air</ListItem>
            <ListItem>Music</ListItem>
          </List>
        </Flex>

        <Divider marginY='1rem' />

        <Flex flexFlow='row wrap' width='100%'>
          <Heading size='md' width='100%' marginBottom='1rem'>
            Where will be
          </Heading>
          {isLoaded && (
            <Flex width='100%' height='20rem'>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={{ lat: -33.91519386250274, lng: 18.420095308767127 }}
                zoom={15}
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
                />
              </GoogleMap>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

Event.displayName = 'Event'
