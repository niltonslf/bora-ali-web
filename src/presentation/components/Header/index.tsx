import { useContext } from 'react'
import { FaDoorOpen } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { AuthContext } from '@/presentation/context'
import { useLogout } from '@/presentation/hooks'
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
  const onLogout = useLogout()

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
              src={getCurrentAccount()?.profilePicture}
              width='30px'
              height='30px'
            />
          </Flex>
        </PopoverTrigger>
        <PopoverContent width='200px'>
          <PopoverBody>
            <List marginBottom='1rem' justifyContent='flex-start'>
              <ListItem borderBottom='1px' borderColor='gray.200' padding='0.5rem 0 '>
                <Link to='/profile'>Meu perfil</Link>
              </ListItem>

              <ListItem borderBottom='1px' borderColor='gray.200' padding='0.5rem 0 '>
                <Link to='/create-event'>Criar rolê</Link>
              </ListItem>
            </List>

            <Button
              background='orange'
              width='100%'
              data-testid='logout'
              onClick={() => onLogout()}
              rightIcon={<FaDoorOpen />}
            >
              Logout
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}

Header.displayName = 'Header'
