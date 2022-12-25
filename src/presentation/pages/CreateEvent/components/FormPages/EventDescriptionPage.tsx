import { Flex, Heading, Textarea } from '@chakra-ui/react'

import { useCreateEventContext } from '../../context/create-event-context'
import { FormContainer } from '../FormContainer'

export const EventDescriptionPage: React.FC = () => {
  const { setFormState, formState } = useCreateEventContext()

  return (
    <FormContainer>
      <Heading size='md'>Adicione uma descrição sobre o rolê</Heading>
      <Flex width='100%' marginTop='2rem'>
        <Textarea
          width='100%'
          rows={5}
          value={formState.description}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, description: event.target.value }))
          }
        />
      </Flex>
    </FormContainer>
  )
}

EventDescriptionPage.displayName = 'EventDescriptionPage'
