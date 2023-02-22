import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { stepPage } from '@/presentation/components/StepPage/store/step-page'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
import { Flex, Heading, Input } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'

export const EventName: React.FC = observer(() => {
  useEffect(() => {
    if (createEvent.formState.name) stepPage.disableNextButton(false)
    else stepPage.disableNextButton(true)
  }, [createEvent.formState.name])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-name-title'>
        Por último, dê um nome que melhor descreve o seu rolê
      </Heading>
      <Flex width='100%' marginTop='2rem'>
        <Input
          data-testid='event-name-input'
          width='100%'
          value={createEvent.formState.name ?? ''}
          onChange={(event) => {
            createEvent.setFormState({ ...createEvent.formState, name: event.target.value })
          }}
        />
      </Flex>
    </FormContainer>
  )
})

EventName.displayName = 'EventName'
