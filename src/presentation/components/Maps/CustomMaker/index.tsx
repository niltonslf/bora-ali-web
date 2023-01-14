import { useContext, useEffect, useState } from 'react'

import { EventModel } from '@/domain/models'
import { EventMapContext } from '@/presentation/pages/EventMap/context'
import { Box } from '@chakra-ui/react'
import { InfoWindow, Marker } from '@react-google-maps/api'

type CustomMakerProps = {
  event: EventModel
}

export const CustomMaker: React.FC<CustomMakerProps> = ({ event }) => {
  const context = useContext(EventMapContext)

  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (context?.focusEvent && context?.focusEvent.id === event.id) setActive(true)
    else setActive(false)
  }, [context?.focusEvent])

  return (
    <Marker
      icon={{
        url: `/assets/map/${active ? 'black-pin.svg' : 'orange-pin.svg'}`,
        scaledSize: { width: 30, height: 50, equals: () => false },
      }}
      title={event.name}
      position={{ lat: Number(event.lat), lng: Number(event.lng) }}
      onClick={() => setVisible((prev) => !prev)}
    >
      {visible && (
        <InfoWindow>
          <Box>{event.name}</Box>
        </InfoWindow>
      )}
    </Marker>
  )
}

CustomMaker.displayName = 'CustomMaker'
