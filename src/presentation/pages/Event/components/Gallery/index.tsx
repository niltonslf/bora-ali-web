import { useEffect, useState } from 'react'

import { ImageModel } from '@/domain/models'
import { getImagePath } from '@/presentation/utils'
import { Box, Grid } from '@chakra-ui/react'

type GalleryProps = {
  images: ImageModel[]
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [minImages, setMinImages] = useState<string[]>(['', '', '', ''])

  const getGridName = (index: number) => {
    switch (index) {
      case 0:
        return 'first'
      case 1:
        return 'second'
      case 2:
        return 'third'
      case 3:
        return 'fourth'
      default:
        return 'hidden'
    }
  }

  useEffect(() => {
    setMinImages(minImages.map((_, index) => images[index]?.image))
  }, [images])

  return (
    <Grid
      data-testid='gallery-section'
      marginTop='1rem'
      width='100%'
      height='31rem'
      gridTemplateAreas={`
          'first first second second'
          'first first third fourth'
        `}
      gap='1rem'
    >
      {minImages?.map((image, index) => {
        return (
          <Box
            key={`gallery-${index}`}
            borderTopLeftRadius={index === 0 ? '1rem' : '0rem'}
            borderBottomLeftRadius={index === 0 ? '1rem' : '0rem'}
            borderTopRightRadius={index === 1 ? '1rem' : '0rem'}
            borderBottomRightRadius={index === 3 ? '1rem' : '0rem'}
            gridArea={getGridName(index)}
            backgroundSize='cover'
            backgroundPosition='center'
            backgroundImage={`url(${getImagePath(image)})`}
          />
        )
      })}
    </Grid>
  )
}

Gallery.displayName = 'Gallery'
