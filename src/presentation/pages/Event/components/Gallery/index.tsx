import { Box, Grid } from '@chakra-ui/react'

type GalleryProps = {
  any?: any
}

export const Gallery: React.FC<GalleryProps> = () => {
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
      <Box
        borderTopLeftRadius='1rem'
        borderBottomLeftRadius='1rem'
        gridArea='first'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundImage='url(/temp/images/event-1.png)'
      ></Box>
      <Box
        borderTopRightRadius='1rem'
        gridArea='second'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundImage='url(/temp/images/event-3.jpg)'
      ></Box>
      <Box
        gridArea='third'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundImage='url(/temp/images/event-2.png)'
      ></Box>
      <Box
        borderBottomRightRadius='1rem'
        gridArea='fourth'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundImage='url(/temp/images/event-1.png)'
      ></Box>
    </Grid>
  )
}

Gallery.displayName = 'Gallery'
