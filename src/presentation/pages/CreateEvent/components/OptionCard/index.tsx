import { Flex, Heading, Text } from '@chakra-ui/react'

type OptionCardProps = {
  title: string
  description?: string
  icon?: React.ReactElement
}

export const OptionCard: React.FC<OptionCardProps> = ({ title, description, icon, ...props }) => {
  return (
    <Flex
      {...props}
      width='100%'
      borderWidth='1px'
      borderColor='gray.300'
      borderRadius='0.5rem'
      flexFlow='row'
      padding='0.8rem 0.5rem'
      cursor='pointer'
      _checked={{
        borderColor: 'black',
        borderWidth: '2px',
      }}
    >
      <Flex flexDirection='column' flex={1}>
        <Heading size='sm'>{title}</Heading>

        {description && (
          <Text color='gray.600' fontSize='12px' marginTop='5px'>
            {description}
          </Text>
        )}
      </Flex>

      {icon && (
        <Flex width='2rem' justifyContent='center' alignItems='center'>
          {icon}
        </Flex>
      )}
    </Flex>
  )
}

OptionCard.displayName = 'OptionCard'
