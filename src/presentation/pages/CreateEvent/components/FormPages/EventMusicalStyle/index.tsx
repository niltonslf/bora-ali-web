import { Grid, Heading, useCheckboxGroup } from '@chakra-ui/react'

import { useCreateEventContext } from '../../../context/create-event-context'
import { CheckBoxItem } from '../../CheckBoxItem'
import { FormContainer } from '../../FormContainer'

export const EventMusicalStyle: React.FC = () => {
  const options = [
    { id: '1', label: 'Sem música' },
    { id: '2', label: 'Rock' },
    { id: '3', label: 'Rap' },
    { id: '4', label: 'Sertanejo' },
    { id: '5', label: 'Funk' },
    { id: '6', label: 'Pagode' },
  ]
  const { setFormState, formState } = useCreateEventContext()

  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
    value: formState.musicalStyle,
    onChange: (value: string[]) => setFormState((prev) => ({ ...prev, musicalStyle: value })),
  })

  return (
    <FormContainer>
      <Heading size='md'>Qual o estilo musical do rolê?</Heading>
      <Grid gridTemplateColumns='1fr 1fr 1fr' width='100%' marginTop='2rem' gap='1rem'>
        {options.map((category) => {
          return (
            <CheckBoxItem
              key={category.id}
              title={category.label}
              {...getCheckboxProps({ value: category.id })}
            />
          )
        })}
      </Grid>
    </FormContainer>
  )
}

EventMusicalStyle.displayName = 'EventMusicalStyle'
