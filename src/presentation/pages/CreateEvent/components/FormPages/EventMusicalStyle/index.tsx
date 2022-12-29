import { Grid, Heading, useRadioGroup } from '@chakra-ui/react'

import { useCreateEventContext } from '../../../context/create-event-context'
import { FormContainer } from '../../FormContainer'
import { OptionItem } from '../../OptionItem'

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

  const { getRadioProps } = useRadioGroup({
    defaultValue: '',
    value: formState.musicStyleId,
    onChange: (value: string) => setFormState((prev) => ({ ...prev, musicStyleId: value })),
  })

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-musical-style-title'>
        Qual o estilo musical do rolê?
      </Heading>
      <Grid
        gridTemplateColumns='1fr 1fr 1fr'
        width='100%'
        marginTop='2rem'
        gap='1rem'
        data-testid='event-musical-styles'
      >
        {options.map((category) => {
          return (
            <OptionItem
              key={category.id}
              title={category.label}
              {...getRadioProps({ value: category.id })}
            />
          )
        })}
      </Grid>
    </FormContainer>
  )
}

EventMusicalStyle.displayName = 'EventMusicalStyle'
