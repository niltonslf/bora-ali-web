import React from 'react'

import { Flex, useDisclosure } from '@chakra-ui/react'

type RoundedBadgeProps = {
  onClick: () => void
}

export const RoundedBadge: React.FC<React.PropsWithChildren<RoundedBadgeProps>> = ({
  children,
  onClick,
}) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Flex
      height='30px'
      whiteSpace='nowrap'
      border='1px'
      minWidth='auto'
      textAlign='center'
      alignItems='center'
      padding='0 0.6rem'
      fontWeight='500'
      cursor='pointer'
      background={isOpen ? 'primary' : 'transparent'}
      color={isOpen ? 'white' : 'black'}
      borderColor={isOpen ? 'primary' : 'gray.300'}
      _hover={{
        background: 'primary',
        color: 'white',
        borderColor: 'primary',
      }}
      borderRadius='20px'
      onClick={() => {
        onToggle()
        if (onClick) onClick()
      }}
    >
      {children}
    </Flex>
  )
}

RoundedBadge.displayName = 'RoundedBadge'
