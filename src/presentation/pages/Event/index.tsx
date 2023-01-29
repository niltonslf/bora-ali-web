import { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaCalendar } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'
import { useParams } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'
import { GoogleMapsLoader, Header } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { formatDateToReadable } from '@/presentation/utils'
import { Box, Divider, Flex, Heading, List, ListItem, Text } from '@chakra-ui/react'
import { GoogleMap } from '@react-google-maps/api'

import { Gallery } from './components'

type EventProps = {
  fetchEvent: FetchEvent
}

export const Event: React.FC<EventProps> = ({ fetchEvent }) => {
  const { eventId } = useParams()

  const [error, setError] = useState<string | null>(null)
  const [event, setEvent] = useState<EventModel>(null as any)
  const [map, setMap] = useState<google.maps.Map>()

  const handleError = useErrorHandler((error) => setError(error.message))

  useEffect(() => {
    if (!map) return
    const marker = new google.maps.Marker({
      position: { lat: Number(event?.lat), lng: Number(event?.lng) },
      title: event?.name,
    })
    marker.setMap(map)

    return () => {
      marker.setMap(null)
    }
  }, [map, event])

  useEffect(() => {
    if (eventId)
      fetchEvent
        .fetchById(eventId)
        .then((event) => setEvent(event))
        .catch((error) => handleError(error))
  }, [eventId])

  return (
    <Flex width='100%' flexFlow='row wrap' paddingX='1rem'>
      <Header />

      {error ? (
        <>{error}</>
      ) : (
        <Flex flexFlow='row wrap' width='75rem' maxWidth='100%' margin='0 auto' paddingY='2rem'>
          <Box width='100%' data-testid='title-section'>
            <Heading size='md'>{event?.name}</Heading>

            <Flex gap='0.5rem' width='100%' textStyle='label' alignItems='center'>
              <FaMapMarkerAlt />
              <Text>{event?.address}</Text>
            </Flex>

            <Flex gap='0.5rem' width='100%' textStyle='label' alignItems='center'>
              <FaCalendar />
              <Text>
                {formatDateToReadable(event?.startDate)} - {formatDateToReadable(event?.endDate)}
              </Text>
            </Flex>
          </Box>

          <Gallery images={event?.images || []} />

          <Flex marginTop='1rem' data-testid='description-section'>
            <Text>{event?.description}</Text>
          </Flex>

          <Divider marginY='1rem' />

          <Flex flexFlow='row wrap' data-testid='options-section'>
            <Heading size='md' width='100%' marginBottom='1rem'>
              What you are going to find here
            </Heading>

            <List>
              {event?.categories.map((category) => (
                <ListItem key={`cat-${category.id}`}>{category.name}</ListItem>
              ))}

              {event?.hasMeal ? <ListItem>Free food</ListItem> : <></>}

              <ListItem>{event?.musicalStyle?.name}</ListItem>

              <ListItem>{event?.placeType.name}</ListItem>
              {event?.price === '0' && <ListItem>Free entry</ListItem>}
            </List>
          </Flex>

          {event?.price > 0 && (
            <>
              <Divider marginY='1rem' />
              <Flex width='100%' flexFlow='row wrap' data-testid='options-section'>
                <Heading size='md' width='100%' marginBottom='1rem'>
                  Price
                </Heading>

                <Flex alignItems='center'>
                  <MdAttachMoney />
                  {event?.price}
                </Flex>
              </Flex>
            </>
          )}

          <Divider marginY='1rem' />

          <Flex flexFlow='row wrap' width='100%' data-testid='map-section'>
            <Heading size='md' width='100%' marginBottom='1rem'>
              Where will be
            </Heading>

            <Flex width='100%' height='20rem'>
              <GoogleMapsLoader>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={{ lat: Number(event?.lat) || 0, lng: Number(event?.lng) || 0 }}
                  onLoad={setMap}
                  zoom={15}
                  options={{
                    fullscreenControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                  }}
                />
              </GoogleMapsLoader>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

Event.displayName = 'Event'
