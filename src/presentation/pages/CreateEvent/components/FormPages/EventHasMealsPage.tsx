import { Grid, Heading, useRadioGroup } from '@chakra-ui/react'

import { useCreateEventContext } from '../../context/create-event-context'
import { FormContainer } from '../FormContainer'
import { OptionItem } from '../OptionItem'

export const EventHasMealsPage: React.FC = () => {
  const options = [
    { id: '1', label: 'Com comida' },
    { id: '2', label: 'Sem Comida' },
  ]
  const { setFormState, formState } = useCreateEventContext()

  const { getRadioProps } = useRadioGroup({
    defaultValue: '',
    value: formState.hasMeal ? '1' : '2',
    onChange: (value) => setFormState((prev) => ({ ...prev, hasMeal: value === '1' })),
  })

  return (
    <FormContainer>
      <Heading size='md'>Qual o estilo musical do rolê?</Heading>
      <Grid gridTemplateColumns='1fr 1fr 1fr' width='100%' marginTop='2rem' gap='1rem'>
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

EventHasMealsPage.displayName = 'EventHasMealsPage'
