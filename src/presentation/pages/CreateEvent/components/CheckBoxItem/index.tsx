import { Flex, Heading, Text, useCheckbox, UseRadioProps } from '@chakra-ui/react'

interface CheckBoxItemProps extends UseRadioProps {
  title: string
  description?: string
  icon?: React.ReactElement
}

export const CheckBoxItem: React.FC<CheckBoxItemProps> = ({
  title,
  description,
  icon,
  ...props
}) => {
  const { getInputProps, getCheckboxProps, htmlProps } = useCheckbox(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Flex as='label' width='100%' {...htmlProps}>
      <input {...input} hidden />
      <Flex
        {...checkbox}
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
    </Flex>
  )
}

CheckBoxItem.displayName = 'CheckBoxItem'
