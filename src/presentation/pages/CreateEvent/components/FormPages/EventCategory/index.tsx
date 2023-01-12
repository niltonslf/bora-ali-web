import { useEffect, useState } from 'react'

import { CategoryModel } from '@/domain/models'
import { FetchCategory } from '@/domain/usecases'
import { Grid, Heading, useCheckboxGroup } from '@chakra-ui/react'

import { useCreateEventContext } from '../../../context/create-event-context'
import { CheckBoxItem } from '../../CheckBoxItem'
import { FormContainer } from '../../FormContainer'

type EventCategoryProps = {
  fetchCategory: FetchCategory
}

export const EventCategory: React.FC<EventCategoryProps> = ({ fetchCategory }) => {
  const [options, setOptions] = useState<CategoryModel[]>([])

  const { setFormState, formState, ...context } = useCreateEventContext()
  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
    value: formState.categories,
    onChange: (value: string[]) => {
      setFormState((prev) => ({ ...prev, categories: value }))
      context.setIsNextButtonDisabled(false)
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategory.fetchAll()
      setOptions(categories)
    }

    fetchData()
  }, [])

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
}

EventCategory.displayName = 'EventCategory'
