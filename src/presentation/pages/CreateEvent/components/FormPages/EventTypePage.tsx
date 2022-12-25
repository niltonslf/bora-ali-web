import { Heading, useRadioGroup, VStack } from '@chakra-ui/react'

import { useCreateEventContext } from '../../context/create-event-context'
import { FormContainer } from '../FormContainer'
import { OptionItem } from '../OptionItem'

type EventTypePageProps = {
  any?: any
}

export const EventTypePage: React.FC<EventTypePageProps> = () => {
  const options = [
    {
      id: '1',
      label: 'Espaço fechado',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
    },
    {
      id: '2',
      label: 'Ao ar livre',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
    },
  ]

  const { setFormState } = useCreateEventContext()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'eventType',
    defaultValue: '2',
    onChange: (value) => setFormState((prev) => ({ ...prev, placeType: value })),
  })

  const group = getRootProps()

  return (
    <FormContainer>
      <Heading size='md'>Qual o tipo de rolê que você está oferecendo?</Heading>

      <VStack width='100%' marginTop='2rem' gap='1rem' {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value: value.id })
          return (
            <OptionItem
              key={value.id}
              {...radio}
              title={value.label}
              description={value.description}
            />
          )
        })}
      </VStack>
    </FormContainer>
  )
}

EventTypePage.displayName = 'EventTypePage'
