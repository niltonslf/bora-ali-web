import React, { useState } from 'react'

import { LoadScript } from '@react-google-maps/api'

type LibrariesProps = 'drawing' | 'geometry' | 'localContext' | 'places' | 'visualization'

export const GoogleMapsLoader: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [libraries] = useState<LibrariesProps[]>(['places'])
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
      loadingElement={<></>}
    >
      {children}
    </LoadScript>
  )
}

GoogleMapsLoader.displayName = 'GoogleMapsLoader'
