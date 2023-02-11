import { Mousewheel, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import { Box, HStack } from '@chakra-ui/react'

type HorizontalFilterProps = {
  any?: any
}

export const HorizontalFilter: React.FC<HorizontalFilterProps> = () => {
  return (
    <HStack
      width='60vw'
      sx={{
        '.swiper': {
          paddingLeft: '30px !important',
          paddingRight: '30px !important',
        },
        '.swiper-button-next': {
          'background': 'white',
          'border': '1px',
          'borderColor': 'black',
          'borderRadius': '50%',
          'width': '30px',
          'height': '30px',
          'marginTop': '-16px',
          'marginRight': '-10px',
          ':after': {
            fontSize: '15px',
            color: 'black',
            fontWeight: 'bold',
          },
        },
        '.swiper-button-prev': {
          'background': 'white',
          'border': '1px',
          'borderColor': 'black',
          'borderRadius': '50%',
          'width': '30px',
          'height': '30px',
          'marginTop': '-16px',
          'marginLeft': '-10px',
          ':after': {
            fontSize: '15px',
            color: 'black',
            fontWeight: 'bold',
          },
        },
        '.swiper-button-disabled': { display: 'none' },
      }}
    >
      <Swiper
        direction='horizontal'
        slidesPerView={8}
        spaceBetween={10}
        mousewheel={true}
        navigation={true}
        fadeEffect={{ crossFade: true }}
        modules={[Mousewheel, Navigation]}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 15].map((category, index) => (
          <SwiperSlide key={index}>
            <Box
              height='33px'
              whiteSpace='nowrap'
              border='1px'
              minWidth='auto'
              textAlign='center'
              padding='0.2rem 0.6rem'
              fontWeight='500'
              cursor='pointer'
              _hover={{
                background: 'primary',
                color: 'white',
                borderColor: 'primary',
              }}
              borderRadius='20px'
              borderColor='gray.300'
            >
              Bar
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </HStack>
  )
}

HorizontalFilter.displayName = 'HorizontalFilter'
