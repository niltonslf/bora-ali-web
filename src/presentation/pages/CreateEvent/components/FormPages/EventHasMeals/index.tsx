import { Grid, Heading, useRadioGroup } from '@chakra-ui/react'

import { useCreateEventContext } from '../../../context/create-event-context'
import { FormContainer } from '../../FormContainer'
import { OptionItem } from '../../OptionItem'

export const EventHasMeals: React.FC = () => {
  const options = [
    { id: '1', label: 'Com comida' },
    { id: '2', label: 'Sem Comida' },
  ]
  const { setFormState, formState, ...context } = useCreateEventContext()

  const { getRadioProps } = useRadioGroup({
    defaultValue: '',
    value: formState.hasMeal === undefined ? '' : formState.hasMeal ? '1' : '2',
    onChange: (value) => {
      setFormState((prev) => ({ ...prev, hasMeal: value === '1' }))
      context.setIsNextButtonDisabled(false)
    },
  })

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-has-meal-title'>
        O local possui espaço para refeições?
      </Heading>
      <Grid
        gridTemplateColumns='1fr 1fr 1fr'
        width='100%'
        marginTop='2rem'
        gap='1rem'
        data-testid='event-has-meal'
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

EventHasMeals.displayName = 'EventHasMeals'
