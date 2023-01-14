import { useContext, useEffect, useState } from 'react'

import { EventModel } from '@/domain/models'
import { EventMapContext } from '@/presentation/pages/EventMap/context'
import { Box } from '@chakra-ui/react'
import { OverlayView } from '@react-google-maps/api'

import { EventCard } from '../../EventCard'
import Pin from '../../Icons/assets/Pin'

type CustomMakerProps = {
  event: EventModel
}

export const CustomMaker: React.FC<CustomMakerProps> = ({ event }) => {
  const context = useContext(EventMapContext)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (context?.focusEvent && context?.focusEvent.id === event.id) setActive(true)
    else setActive(false)
  }, [context?.focusEvent])

  return (
    <OverlayView
      mapPaneName='floatPane'
      position={{ lat: Number(event.lat), lng: Number(event.lng) }}
    >
      <Box position='relative'>
        <Pin
          onClick={() =>
            context?.setFocusEvent(context?.focusEvent?.id === event.id ? null : event)
          }
          width='30px'
          height='50px'
          color={active ? 'black' : 'primary'}
        />
        {active && (
          <Box position='absolute' bottom={'100%'} left={'-100%'} width='300px' zIndex='modal'>
            <EventCard event={event} />
          </Box>
        )}
      </Box>
    </OverlayView>
  )
}

CustomMaker.displayName = 'CustomMaker'
