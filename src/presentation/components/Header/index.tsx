import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '@/presentation/context'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Flex,
  InputGroup,
  InputRightElement,
  Input,
  Avatar,
  Image,
  Box,
  Text,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverBody,
  Button,
} from '@chakra-ui/react'

type HeaderProps = {
  any?: any
}

export const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate()

  const { getCurrentAccount, setCurrentAccount } = useContext(AuthContext)

  const onLogout = () => {
    if (setCurrentAccount) setCurrentAccount()

    navigate('/auth')
  }

  return (
    <Flex
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
    >
      <a href='/'>
        <Image src='/assets/images/borali-brand.png' title='brand' height='50px' />
      </a>

      <Box width='500px'>
        <InputGroup>
          <InputRightElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputRightElement>
          <Input type='tel' placeholder='Find here what you wanna do' />
        </InputGroup>
      </Box>

      <Flex
        border='1px'
        borderRadius='30px'
        borderColor='gray.300'
        alignItems='center'
        gap={2}
        padding='4px 8px'
      >
        <Text textStyle='label'>{getCurrentAccount()?.name}</Text>
        <Popover placement='bottom-start'>
          <PopoverTrigger>
            <Avatar src={getCurrentAccount()?.profile_picture} width='30px' height='30px' />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <Button data-testid='logout' onClick={onLogout}>
                Logout
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  )
}

Header.displayName = 'Header'
