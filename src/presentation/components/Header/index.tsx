import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { HorizontalFilter } from '@/presentation/components/HorizontalFilter'
import { AuthContext } from '@/presentation/context'
import { Flex, Image, Box } from '@chakra-ui/react'

import { ProfileMenu } from '../ProfileMenu'

type HeaderProps = {
  showFilters?: boolean
}

export const Header: React.FC<HeaderProps> = ({ showFilters = false }) => {
  const { getCurrentAccount } = useContext(AuthContext)

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
          order={{ base: 2, md: 'unset' }}
          width={{ base: '100%', md: '60vw' }}
          marginTop={{ base: '15px', md: 0 }}
        >
          <HorizontalFilter />
        </Box>
      )}

      <ProfileMenu account={getCurrentAccount()} />
    </Flex>
  )
}

Header.displayName = 'Header'
