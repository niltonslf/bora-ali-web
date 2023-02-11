import { useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { CategoryModel, MusicStyleModel, PlaceTypeModel } from '@/domain/models'
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

  let initial = 0

  const handleLeft = () => {
    if (!containerRef.current) return

    if (containerRef.current.scrollWidth - containerRef.current.offsetWidth <= Math.abs(initial)) {
      return
    }

    initial -= 300
    containerRef.current.style.transform = `translateX(${initial}px)`
  }

  const handleRight = () => {
    if (!containerRef.current) return
    if (initial >= 0) {
      return
    }

    initial += 300
    containerRef.current.style.transform = `translateX(${initial}px)`
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
        // overflowX='auto'
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
          <Flex
            key={`cat-${index}`}
            height='30px'
            whiteSpace='nowrap'
            border='1px'
            minWidth='auto'
            textAlign='center'
            alignItems='center'
            padding='0 0.6rem'
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
          </Flex>
        ))}

        {filters?.placesType.map((place, index) => (
          <Flex
            key={`pt-${index}`}
            height='30px'
            whiteSpace='nowrap'
            border='1px'
            minWidth='auto'
            textAlign='center'
            alignItems='center'
            padding='0 0.6rem'
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
          </Flex>
        ))}

        {filters?.musicStyles.map((musicStyle, index) => (
          <Flex
            key={`ms-${index}`}
            height='30px'
            whiteSpace='nowrap'
            border='1px'
            minWidth='auto'
            textAlign='center'
            alignItems='center'
            padding='0 0.6rem'
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
          </Flex>
        ))}
      </HStack>
    </Box>
  )
}

HorizontalFilter.displayName = 'HorizontalFilter'
