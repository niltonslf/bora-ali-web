import { Flex, useRadio, UseRadioProps } from '@chakra-ui/react'

import { OptionCard } from '../OptionCard'

interface OptionItemProps extends UseRadioProps {
  title: string
  description?: string
  icon?: React.ReactElement
}

export const OptionItem: React.FC<OptionItemProps> = ({ title, description, icon, ...props }) => {
  const { getInputProps, getCheckboxProps, htmlProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Flex as='label' width='100%' {...htmlProps}>
      <input {...input} hidden />
      <OptionCard {...checkbox} title={title} description={description} icon={icon} />
    </Flex>
  )
}

OptionItem.displayName = 'OptionItem'
