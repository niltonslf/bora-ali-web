import { Grid, Heading, useCheckboxGroup } from '@chakra-ui/react'

import { useCreateEventContext } from '../../../context/create-event-context'
import { CheckBoxItem } from '../../CheckBoxItem'
import { FormContainer } from '../../FormContainer'

export const EventCategoryPage: React.FC = () => {
  const options = [
    { id: '1', label: 'Bar' },
    { id: '2', label: 'balada' },
    { id: '3', label: 'Show' },
    { id: '4', label: 'Encontro com amigos' },
  ]
  const { setFormState, formState } = useCreateEventContext()

  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
    value: formState.category,
    onChange: (value: string[]) => setFormState((prev) => ({ ...prev, category: value })),
  })

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-category-title'>
        Qual das seguintes opções descreve melhor seu rolê?
      </Heading>
      <Grid
        gridTemplateColumns='1fr 1fr 1fr'
        width='100%'
        marginTop='2rem'
        gap='1rem'
        data-testid='event-categories'
      >
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

EventCategoryPage.displayName = 'EventCategoryPage'
