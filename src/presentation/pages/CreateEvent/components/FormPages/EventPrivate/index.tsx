import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { stepPage } from '@/presentation/components/StepPage/store/step-page'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
import { Grid, Heading, useRadioGroup } from '@chakra-ui/react'
import { OptionItem, FormContainer } from '@pages/CreateEvent/components/'

interface EventPrivateProps {
  any?: any
}

export const EventPrivate: React.FC<EventPrivateProps> = observer(() => {
  const options = [
    { id: '1', label: 'Público' },
    { id: '2', label: 'Privado' },
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
      <Heading size='md' data-testid='event-private-title'>
        O evento é publico ou privado?
      </Heading>
      <Grid
        gridTemplateColumns='1fr 1fr 1fr'
        width='100%'
        marginTop='2rem'
        gap='1rem'
        data-testid='event-private'
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
EventPrivate.displayName = 'EventPrivate'
