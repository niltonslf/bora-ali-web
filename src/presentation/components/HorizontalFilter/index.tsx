import { Mousewheel, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import { CategoryModel, MusicStyleModel, PlaceTypeModel } from '@/domain/models'
import { Box, HStack } from '@chakra-ui/react'

type HorizontalFilterProps = {
  filters?: {
    categories: CategoryModel[]
    placesType: PlaceTypeModel[]
    musicStyles: MusicStyleModel[]
  }
}

export const HorizontalFilter: React.FC<HorizontalFilterProps> = ({ filters }) => {
  return (
    <HStack
      width='100%'
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
        breakpoints={{
          '@0.00': { slidesPerView: 2 },
          '@0.75': { slidesPerView: 3 },
          '@1.00': { slidesPerView: 3 },
          '@1.50': { slidesPerView: 4 },
        }}
      >
        {filters?.categories.map((category, index) => (
          <SwiperSlide key={`cat-${index}`}>
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
              {category.name}
            </Box>
          </SwiperSlide>
        ))}

        {filters?.placesType.map((place, index) => (
          <SwiperSlide key={`pt-${index}`}>
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
              {place.name}
            </Box>
          </SwiperSlide>
        ))}

        {filters?.musicStyles.map((musicStyle, index) => (
          <SwiperSlide key={`ms-${index}`}>
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
              {musicStyle.name}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </HStack>
  )
}

HorizontalFilter.displayName = 'HorizontalFilter'
