import { Button, ButtonProps, Flex } from '@chakra-ui/react'

interface AuthButtonProps extends ButtonProps {
  icon: React.ReactElement
  label: string
}

export const AuthButton: React.FC<AuthButtonProps> = ({ icon, label, ...props }) => {
  return (
    <Button
      {...props}
      justifyContent='flex-start'
      width='100%'
      border='1px solid #787575'
      background='white'
      position='relative'
    >
      {icon}
      <Flex
        position='absolute'
        top='0'
        left='0'
        width='100%'
        height='100%'
        alignItems='center'
        justifyContent='center'
      >
        {label}
      </Flex>
    </Button>
  )
}

AuthButton.displayName = 'AuthButton'
