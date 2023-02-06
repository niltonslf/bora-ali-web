import { useContext, useEffect, useState } from 'react'

import { EventModel } from '@/domain/models'
import { EventMapContext } from '@/presentation/pages/EventMap/context'
import { Box } from '@chakra-ui/react'
import { Marker, OverlayView } from '@react-google-maps/api'

import { EventCard } from '../../EventCard'

type CustomMakerProps = {
  event: EventModel
  onClick: () => void
}

export const CustomMaker: React.FC<CustomMakerProps> = ({ event, onClick }) => {
  const context = useContext(EventMapContext)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (context?.focusEvent && context?.focusEvent.id === event.id) setActive(true)
    else setActive(false)
  }, [context?.focusEvent])

  const onMouseOver = (e: google.maps.MapMouseEvent) => {
    setActive(true)
  }

  return (
    <Marker
      position={{ lat: Number(event.lat), lng: Number(event.lng) }}
      onMouseOver={onMouseOver}
      onMouseOut={() => setActive(false)}
      onClick={onClick}
    >
      {active && (
        <OverlayView
          mapPaneName='floatPane'
          position={{ lat: Number(event.lat), lng: Number(event.lng) }}
        >
          <Box
            width='300px'
            zIndex='modal'
            padding='0.5rem'
            background='white'
            borderRadius='lg'
            boxShadow='base'
          >
            <EventCard event={event} />
          </Box>
        </OverlayView>
      )}
    </Marker>
  )
}

CustomMaker.displayName = 'CustomMaker'
