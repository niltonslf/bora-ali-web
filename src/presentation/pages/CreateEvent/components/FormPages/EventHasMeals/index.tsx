import { Grid, Heading, useRadioGroup } from '@chakra-ui/react'
import { OptionItem, FormContainer } from '@pages/CreateEvent/components/'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'

interface EventHasMealsProps {
  any?: any
}

export const EventHasMeals: React.FC<EventHasMealsProps> = () => {
  const options = [
    { id: '1', label: 'Com comida' },
    { id: '2', label: 'Sem Comida' },
  ]
  const { setFormState, formState } = useCreateEventContext()

  const { getRadioProps } = useRadioGroup({
    defaultValue: '',
    value: formState.hasMeal === undefined ? '' : formState.hasMeal ? '1' : '2',
    onChange: (value) => {
      setFormState((prev) => ({ ...prev, hasMeal: value === '1' }))
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
