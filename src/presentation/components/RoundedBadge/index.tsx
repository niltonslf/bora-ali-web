import React from 'react'

import { Flex, FlexProps } from '@chakra-ui/react'

export const RoundedBadge: React.FC<React.PropsWithChildren<FlexProps>> = ({
  children,
  ...props
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
      _hover={{
        background: 'primary',
        color: 'white',
        borderColor: 'primary',
      }}
      borderRadius='20px'
      borderColor='gray.300'
      {...props}
    >
      {children}
    </Flex>
  )
}

RoundedBadge.displayName = 'RoundedBadge'
