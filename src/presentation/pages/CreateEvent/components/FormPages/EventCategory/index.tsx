import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { CategoryModel } from '@/domain/models'
import { FetchCategory } from '@/domain/usecases'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
import { Grid, Heading, useCheckboxGroup } from '@chakra-ui/react'
import { CheckBoxItem, FormContainer } from '@pages/CreateEvent/components'

type EventCategoryProps = {
  fetchCategory: FetchCategory
}

export const EventCategory: React.FC<EventCategoryProps> = observer(({ fetchCategory }) => {
  const [options, setOptions] = useState<CategoryModel[]>([])

  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
    value: createEvent.formState.categories,
    onChange: (value: string[]) => {
      createEvent.setFormState({ ...createEvent.formState, categories: value })
    },
  })

  useEffect(() => {
    fetchCategory.fetchAll().then(setOptions)
  }, [])

  useEffect(() => {
    if (createEvent.formState.categories?.length) createEvent.disableNextButton(false)
    else createEvent.disableNextButton(true)
  }, [createEvent.formState.categories])

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
              title={category.name}
              {...getCheckboxProps({ value: category.id })}
            />
          )
        })}
      </Grid>
    </FormContainer>
  )
})

EventCategory.displayName = 'EventCategory'
