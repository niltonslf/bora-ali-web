import { useState } from 'react'

import { Box } from '@chakra-ui/react'
import { InfoWindow, Marker } from '@react-google-maps/api'

type CustomMakerProps = {
  title: string
  lat: number
  lng: number
}

export const CustomMaker: React.FC<CustomMakerProps> = ({ title, lat, lng }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Marker
      title={title}
      position={{ lat: Number(lat), lng: Number(lng) }}
      onClick={() => setVisible((prev) => !prev)}
    >
      {visible && (
        <InfoWindow>
          <Box>{title}</Box>
        </InfoWindow>
      )}
    </Marker>
  )
}

CustomMaker.displayName = 'CustomMaker'
