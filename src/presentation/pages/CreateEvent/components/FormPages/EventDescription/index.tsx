import { Flex, Heading, Textarea } from '@chakra-ui/react'

import { useCreateEventContext } from '../../../context/create-event-context'
import { FormContainer } from '../../FormContainer'

export const EventDescription: React.FC = () => {
  const { setFormState, formState, ...context } = useCreateEventContext()

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-description-title'>
        Adicione uma descrição sobre o rolê
      </Heading>
      <Flex width='100%' marginTop='2rem'>
        <Textarea
          data-testid='event-description-input'
          width='100%'
          rows={5}
          value={formState.description}
          onChange={(event) => {
            setFormState((prev) => ({ ...prev, description: event.target.value }))
            context.setIsNextButtonDisabled(false)
          }}
        />
      </Flex>
    </FormContainer>
  )
}

EventDescription.displayName = 'EventDescription'
