import { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaCalendar, FaMap, FaUber, FaClock } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'
import { useParams } from 'react-router-dom'

import { EventModel } from '@/domain/models'
import { FetchEvent } from '@/domain/usecases'
import { GoogleMapsLoader, Header } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { formatDateToReadable, formatTimeToReadable, getUberUrl } from '@/presentation/utils'
import { Box, Button, Divider, Flex, Heading, HStack, List, ListItem, Text } from '@chakra-ui/react'
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

            {event?.startDate && event?.endDate && (
              <Flex gap='0.5rem' width='100%' textStyle='label' alignItems='center'>
                <FaCalendar />
                <Text>
                  {formatDateToReadable(event?.startDate)}
                  {event?.endDate && <span> - {formatDateToReadable(event?.endDate)}</span>}
                </Text>
              </Flex>
            )}
            <Flex gap='0.5rem' width='100%' textStyle='label' alignItems='center'>
              <FaClock />
              <Text>
                {formatTimeToReadable(event?.startTime)} - {formatTimeToReadable(event?.endTime)}
              </Text>
            </Flex>
          </Box>

          <Gallery images={event?.images || []} />

          <Flex marginTop='1rem' data-testid='description-section'>
            <Text dangerouslySetInnerHTML={{ __html: event?.description }}></Text>
          </Flex>

          <Divider marginY='1rem' />

          <Flex flexFlow='row wrap' data-testid='options-section'>
            <Heading size='md' width='100%' marginBottom='1rem'>
              O que você vai encontrar aqui
            </Heading>

            <List>
              {event?.categories.map((category) => (
                <ListItem key={`cat-${category.id}`}>{category.name}</ListItem>
              ))}
              {Boolean(event?.hasMeal) && <ListItem>Espaço para refeição</ListItem>}
              {Number(event?.price) === 0 && <ListItem>Entrada gratuita</ListItem>}
              <ListItem>{event?.musicStyle?.name}</ListItem>
              <ListItem>{event?.placeType.name}</ListItem>
            </List>
          </Flex>

          {Number(event?.price) > 0 && (
            <>
              <Divider marginY='1rem' />
              <Flex width='100%' flexFlow='row wrap' data-testid='price-section'>
                <Heading size='md' width='100%' marginBottom='1rem'>
                  Entrada
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
            <Flex
              justifyContent='space-between'
              flex={1}
              alignItems='center'
              marginBottom='1rem'
              wrap='wrap'
            >
              <Heading size='md'>Onde será</Heading>
              <HStack width={{ base: '100%', md: 'auto' }}>
                <Button
                  rightIcon={<FaUber />}
                  size='sm'
                  as='a'
                  target='_blank'
                  href={getUberUrl(event?.lat, event?.lng, event?.address)}
                >
                  Chamar um Uber
                </Button>
                <Button
                  rightIcon={<FaMap />}
                  size='sm'
                  as='a'
                  target='_blank'
                  href={`http://www.google.com/maps/place/${event?.lat},${event?.lng}`}
                >
                  Abrir no Maps
                </Button>
              </HStack>
            </Flex>

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
