import React from 'react'

import { LoadScript } from '@react-google-maps/api'

export const GoogleMapsLoader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
      loadingElement={<></>}
    >
      {children}
    </LoadScript>
  )
}

GoogleMapsLoader.displayName = 'GoogleMapsLoader'
