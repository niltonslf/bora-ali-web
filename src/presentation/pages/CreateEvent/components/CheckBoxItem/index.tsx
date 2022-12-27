import { Flex, useCheckbox, UseRadioProps } from '@chakra-ui/react'

import { OptionCard } from '../OptionCard'

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
      <OptionCard {...checkbox} title={title} description={description} icon={icon} />
    </Flex>
  )
}

CheckBoxItem.displayName = 'CheckBoxItem'
