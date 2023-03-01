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
    { value: 'false', label: 'Público' },
    { value: 'true', label: 'Privado' },
  ]

  const { getRadioProps } = useRadioGroup({
    defaultValue: 'false',
    value: `${createEvent.formState.isPrivate}`,
    onChange: (value) => {
      createEvent.setFormState({ ...createEvent.formState, isPrivate: value === 'true' })
    },
  })

  useEffect(() => {
    if (createEvent.formState.isPrivate !== undefined) stepPage.disableNextButton(false)
    else stepPage.disableNextButton(true)
  }, [createEvent.formState.isPrivate])

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
        {options.map((category, index) => {
          return (
            <OptionItem
              key={index}
              title={category.label}
              {...getRadioProps({ value: `${category.value}` })}
            />
          )
        })}
      </Grid>
    </FormContainer>
  )
})
EventPrivate.displayName = 'EventPrivate'
