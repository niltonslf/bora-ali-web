import { useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { CategoryModel, MusicStyleModel, PlaceTypeModel } from '@/domain/models'
import { RoundedBadge } from '@/presentation/components/RoundedBadge'
import { Box, Flex, HStack } from '@chakra-ui/react'

type HorizontalFilterProps = {
  filters?: {
    categories: CategoryModel[]
    placesType: PlaceTypeModel[]
    musicStyles: MusicStyleModel[]
  }
}

export const HorizontalFilter: React.FC<HorizontalFilterProps> = ({ filters }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleLeft = () => {
    if (!containerRef.current) return

    containerRef.current.scrollLeft -= 300
  }

  const handleRight = () => {
    if (!containerRef.current) return

    containerRef.current.scrollLeft += 300
  }

  const handleCategories = (category: string) => {
    navigate(`/?category=${category}`)
  }
  const handlePlaceType = (placeType: string) => {
    navigate(`/?place-type=${placeType}`)
  }
  const handleMusicStyle = (musicStyle: string) => {
    navigate(`/?music-style=${musicStyle}`)
  }

  return (
    <Box position='relative' width='100%' paddingX='35px' overflow='hidden'>
      <Flex
        justifyContent='center'
        alignItems='center'
        width='30px'
        height='30px'
        border='1px'
        borderColor='gray.200'
        borderRadius='50%'
        position='absolute'
        background='white'
        cursor='pointer'
        zIndex='docked'
        left={0}
        top={0}
        onClick={handleLeft}
      >
        <FaChevronLeft />
      </Flex>
      <Flex
        justifyContent='center'
        alignItems='center'
        width='30px'
        height='30px'
        border='1px'
        borderColor='gray.200'
        borderRadius='50%'
        position='absolute'
        background='white'
        cursor='pointer'
        zIndex='docked'
        right={0}
        top={0}
        onClick={handleRight}
      >
        <FaChevronRight />
      </Flex>
      <HStack
        ref={containerRef}
        width='100%'
        userSelect='none'
        overflowX='auto'
        sx={{
          'transitionProperty': 'all',
          'transitionDuration': '0.15s',
          'transitionTimingFunction': 'cubic-bezier(0.05,0,0,1)',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {filters?.categories.map((category, index) => (
          <RoundedBadge key={`cat-${index}`} onClick={() => handleCategories(category.name)}>
            {category.name}
          </RoundedBadge>
        ))}

        {filters?.placesType.map((place, index) => (
          <RoundedBadge key={`pt-${index}`} onClick={() => handlePlaceType(place.name)}>
            {place.name}
          </RoundedBadge>
        ))}

        {filters?.musicStyles.map((musicStyle, index) => (
          <RoundedBadge key={`ms-${index}`} onClick={() => handleMusicStyle(musicStyle.name)}>
            {musicStyle.name}
          </RoundedBadge>
        ))}
      </HStack>
    </Box>
  )
}

HorizontalFilter.displayName = 'HorizontalFilter'
