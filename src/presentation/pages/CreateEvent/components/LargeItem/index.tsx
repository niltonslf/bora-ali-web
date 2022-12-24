import { Flex, Heading, Text } from '@chakra-ui/react'

type LargeItemProps = {
  title: string
  description: string
  icon?: React.ReactElement
  isActive?: boolean
}

export const LargeItem: React.FC<LargeItemProps> = ({ isActive, title, description, icon }) => {
  return (
    <Flex
      width='100%'
      borderWidth={isActive ? '2px' : '1px'}
      borderColor={isActive ? 'black' : 'gray.300'}
      borderRadius='0.5rem'
      flexFlow='row'
      padding='0.8rem 0.5rem'
      cursor='pointer'
    >
      <Flex flexDirection='column' flex={1}>
        <Heading size='sm'>{title}</Heading>
        <Text color='gray.600' fontSize='12px' marginTop='5px'>
          {description}
        </Text>
      </Flex>

      <Flex width='2rem' justifyContent='center' alignItems='center'>
        {icon}
      </Flex>
    </Flex>
  )
}

LargeItem.displayName = 'LargeItem'
