import { useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

import { CategoryModel, MusicStyleModel, PlaceTypeModel } from '@/domain/models'
import { RoundedBadge } from '@/presentation/components/RoundedBadge'
import { Box, Flex, HStack } from '@chakra-ui/react'

type HorizontalFilterProps = {
  filters: {
    categories: CategoryModel[]
    placesType: PlaceTypeModel[]
    musicStyles: MusicStyleModel[]
  }
}

export const HorizontalFilter: React.FC<HorizontalFilterProps> = ({ filters }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { search } = useLocation()

  const term = decodeURI(search.split('=').at(1) || '')

  const handleLeft = () => {
    if (!containerRef.current) return

    containerRef.current.scrollLeft -= 300
  }

  const handleRight = () => {
    if (!containerRef.current) return

    containerRef.current.scrollLeft += 300
  }

  const handleClickFilter = (
    filterName: string,
    type: 'category' | 'place-type' | 'music-style'
  ) => {
    if (decodeURI(search).includes(filterName)) return navigate('/')

    navigate(`/?${type}=${filterName}`)
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
        data-testid='filters-container'
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
          <RoundedBadge
            key={`cat-${index}`}
            isActive={term === category.name}
            onClick={() => handleClickFilter(category.name, 'category')}
          >
            {category.name}
          </RoundedBadge>
        ))}

        {filters?.placesType.map((place, index) => (
          <RoundedBadge
            key={`pt-${index}`}
            isActive={term === place.name}
            onClick={() => handleClickFilter(place.name, 'place-type')}
          >
            {place.name}
          </RoundedBadge>
        ))}

        {filters?.musicStyles.map((musicStyle, index) => (
          <RoundedBadge
            key={`ms-${index}`}
            isActive={term === musicStyle.name}
            onClick={() => handleClickFilter(musicStyle.name, 'music-style')}
          >
            {musicStyle.name}
          </RoundedBadge>
        ))}
      </HStack>
    </Box>
  )
}

HorizontalFilter.displayName = 'HorizontalFilter'
