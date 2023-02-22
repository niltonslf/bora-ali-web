import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { stepPage } from '@/presentation/components/StepPage/store/step-page'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
import { Grid, Heading, useRadioGroup } from '@chakra-ui/react'
import { OptionItem, FormContainer } from '@pages/CreateEvent/components/'

interface EventHasMealsProps {
  any?: any
}

export const EventHasMeals: React.FC<EventHasMealsProps> = observer(() => {
  const options = [
    { id: '1', label: 'Com comida' },
    { id: '2', label: 'Sem Comida' },
  ]

  const { getRadioProps } = useRadioGroup({
    defaultValue: '',
    value:
      createEvent.formState.hasMeal === undefined ? '' : createEvent.formState.hasMeal ? '1' : '2',
    onChange: (value) => {
      createEvent.setFormState({ ...createEvent.formState, hasMeal: value === '1' })
    },
  })

  useEffect(() => {
    if (createEvent.formState.hasMeal !== undefined) stepPage.disableNextButton(false)
    else stepPage.disableNextButton(true)
  }, [createEvent.formState.hasMeal])

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
})
EventHasMeals.displayName = 'EventHasMeals'
