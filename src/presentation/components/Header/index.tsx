import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
  List,
  ListItem,
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
      <Link to='/'>
        <Image src='/assets/images/borali-brand.png' title='brand' height='50px' />
      </Link>

      <Box width='500px'>
        <InputGroup>
          <InputRightElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputRightElement>
          <Input type='tel' placeholder='Find here what you wanna do' />
        </InputGroup>
      </Box>

      <Popover placement='bottom-start'>
        <PopoverTrigger>
          <Flex
            border='1px'
            borderRadius='30px'
            borderColor='gray.300'
            alignItems='center'
            gap={2}
            padding='4px 8px'
            cursor='pointer'
          >
            <Text textStyle='label' data-testid='username'>
              {getCurrentAccount()?.name}
            </Text>

            <Avatar
              data-testid='avatar'
              src={getCurrentAccount()?.profile_picture}
              width='30px'
              height='30px'
            />
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <List>
              <ListItem>
                <Link to='/profile'>My profile</Link>
              </ListItem>
              <ListItem>
                <Link to='/create-event'>Create event</Link>
              </ListItem>
              <ListItem>
                <Link to='/my-events'>My Events</Link>
              </ListItem>
            </List>

            <Button width='100%' data-testid='logout' onClick={onLogout}>
              Logout
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}

Header.displayName = 'Header'
