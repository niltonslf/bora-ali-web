import React from 'react'

import { Flex } from '@chakra-ui/react'

type RoundedBadgeProps = {
  onClick: () => void
  isActive?: boolean
}

export const RoundedBadge: React.FC<React.PropsWithChildren<RoundedBadgeProps>> = ({
  children,
  onClick,
  isActive = false,
}) => {
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
      background={isActive ? 'primary' : 'transparent'}
      color={isActive ? 'white' : 'black'}
      borderColor={isActive ? 'primary' : 'gray.300'}
      _hover={{
        background: 'primary',
        color: 'white',
        borderColor: 'primary',
      }}
      borderRadius='20px'
      onClick={() => {
        if (onClick) onClick()
      }}
    >
      {children}
    </Flex>
  )
}

RoundedBadge.displayName = 'RoundedBadge'
