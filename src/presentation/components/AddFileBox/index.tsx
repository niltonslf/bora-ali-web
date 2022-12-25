import React from 'react'

import { Flex, Heading } from '@chakra-ui/react'

import Pictures from '../Icons/assets/Pictures'

interface AddFileBoxProps extends Pick<React.HTMLProps<HTMLLabelElement>, 'htmlFor'> {}

export const AddFileBox: React.FC<AddFileBoxProps> = (props) => {
  return (
    <Flex
      {...props}
      as='label'
      cursor='pointer'
      width='100%'
      border='1px solid'
      borderStyle='dashed'
      height='300px'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Pictures width='3.125rem' height='auto' />
      <Heading size='sm' marginTop='1rem'>
        Escolha pelo menos 4 fotos
      </Heading>
    </Flex>
  )
}

AddFileBox.displayName = 'AddFileBox'
