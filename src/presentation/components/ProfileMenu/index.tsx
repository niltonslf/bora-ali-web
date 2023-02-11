import { FaDoorOpen } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { AccountModel } from '@/domain/models'
import { useLogout } from '@/presentation/hooks'
import {
  Flex,
  Avatar,
  Text,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverBody,
  Button,
  List,
  ListItem,
} from '@chakra-ui/react'

type ProfileMenuProps = {
  account: AccountModel
}
export const ProfileMenu: React.FC<ProfileMenuProps> = ({ account }) => {
  const onLogout = useLogout()

  return (
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
            {account?.name}
          </Text>

          <Avatar data-testid='avatar' src={account?.profilePicture} width='30px' height='30px' />
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
  )
}

ProfileMenu.displayName = 'ProfileMenu'
