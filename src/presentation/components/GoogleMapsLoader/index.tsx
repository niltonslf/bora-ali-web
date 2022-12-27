import React, { useState } from 'react'

import { useLoadScript } from '@react-google-maps/api'

type LibrariesProps = 'drawing' | 'geometry' | 'localContext' | 'places' | 'visualization'

export const GoogleMapsLoader: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [libraries] = useState<LibrariesProps[]>(['places'])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (isLoaded) return <>{children}</>
  if (loadError) return <>couldn't load the map</>
  return <></>
}

GoogleMapsLoader.displayName = 'GoogleMapsLoader'
