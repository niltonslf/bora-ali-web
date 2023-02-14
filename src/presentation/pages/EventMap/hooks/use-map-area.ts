import { useEffect, useState } from 'react'

type MapCoordsProps = {
  lat: number
  lng: number
}

export const useMapArea = (map: google.maps.Map | null, mapCenter: MapCoordsProps) => {
  const [areaInKms, setAreaInKms] = useState(14)

  useEffect(() => {
    if (!window?.google || !map) return

    const bounds = map?.getBounds()

    const coords = [
      { lat: bounds?.getNorthEast().lat(), lng: bounds?.getNorthEast().lng() },
      { lat: bounds?.getSouthWest().lat(), lng: bounds?.getNorthEast().lng() },
      { lat: bounds?.getSouthWest().lat(), lng: bounds?.getSouthWest().lng() },
      { lat: bounds?.getNorthEast().lat(), lng: bounds?.getSouthWest().lng() },
    ]

    const polygon = new google.maps.Polygon({ paths: coords })

    const area = google.maps.geometry?.spherical.computeArea(polygon.getPath())

    if (area) setAreaInKms(Math.sqrt(area) / 1000 / 1.5)
  }, [map, mapCenter])

  return {
    areaInKms,
  }
}
