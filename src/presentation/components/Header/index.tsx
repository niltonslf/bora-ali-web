import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { RemoteFetchCategory, RemoteFetchPlaceType, RemoteFetchMusicStyle } from '@/data/usecases'
import { CategoryModel, MusicStyleModel, PlaceTypeModel } from '@/domain/models'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { HorizontalFilter } from '@/presentation/components/HorizontalFilter'
import { AuthContext } from '@/presentation/context'
import { Flex, Image, Box } from '@chakra-ui/react'

import { ProfileMenu } from '../ProfileMenu'

type HeaderProps = {
  showFilters?: boolean
}

const httpClient = makeAuthorizeHttpClientDecorator()
const fetchCategory = new RemoteFetchCategory(httpClient)
const fetchPlaceType = new RemoteFetchPlaceType(httpClient)
const fetchMusicStyle = new RemoteFetchMusicStyle(httpClient)

export const Header: React.FC<HeaderProps> = ({ showFilters = false }) => {
  const { getCurrentAccount } = useContext(AuthContext)

  const [categories, setCategories] = useState<CategoryModel[]>([])
  const [placesType, setPlacesType] = useState<PlaceTypeModel[]>([])
  const [musicStyles, setMusicStyles] = useState<MusicStyleModel[]>([])

  useEffect(() => {
    fetchCategory
      .fetchAll()
      .then(setCategories)
      .catch(() => setCategories([]))

    fetchPlaceType
      .fetchAll()
      .then(setPlacesType)
      .catch(() => setPlacesType([]))

    fetchMusicStyle
      .fetchAll()
      .then(setMusicStyles)
      .catch(() => setMusicStyles([]))
  }, [])

  return (
    <Flex
      data-testid='page-header'
      width='100%'
      alignItems='center'
      as='header'
      borderBottom='1px'
      borderColor='gray.200'
      position='sticky'
      top={0}
      left={0}
      background='white'
      padding='1rem'
      zIndex='modal'
      justifyContent='space-between'
      wrap='wrap'
    >
      <Link to='/'>
        <Image
          src='/assets/images/borali-brand.png'
          title='brand'
          height={{ base: '30px', md: '50px' }}
        />
      </Link>

      {showFilters && (
        <Box
          display={{ base: '100vw', md: 'block' }}
          order={{ base: 2, sm: 2, md: '2', lg: 'unset' }}
          width={{ base: '100%', md: '70vw' }}
          marginTop={{ base: '15px', md: 0 }}
        >
          <HorizontalFilter filters={{ categories, placesType, musicStyles }} />
        </Box>
      )}

      <ProfileMenu account={getCurrentAccount()} />
    </Flex>
  )
}

Header.displayName = 'Header'
