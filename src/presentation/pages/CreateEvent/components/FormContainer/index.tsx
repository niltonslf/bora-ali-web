import React from 'react'

import { Flex } from '@chakra-ui/react'

export const FormContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      width='46.25rem'
      maxWidth='100%'
      margin='0 auto'
      paddingY='2rem'
      paddingX='1rem'
      flexFlow='row wrap'
      alignContent='flex-start'
    >
      {children}
    </Flex>
  )
}

FormContainer.displayName = 'FormContainer'
