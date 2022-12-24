import React from 'react'

import { Flex } from '@chakra-ui/react'

type StepItemProps = {
  any?: any
}

export const StepItem: React.FC<React.PropsWithChildren<StepItemProps>> = ({ children }) => {
  return (
    <Flex width='100%' height='100%' background='red'>
      {children}
    </Flex>
  )
}

StepItem.displayName = 'StepItem'
