import { Flex, Heading, Input } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'

export const EventName: React.FC = () => {
  const { setFormState, formState } = useCreateEventContext()

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-name-title'>
        Por último, dê um nome que melhor descreve o seu rolê
      </Heading>
      <Flex width='100%' marginTop='2rem'>
        <Input
          data-testid='event-name-input'
          width='100%'
          value={formState.name ?? ''}
          onChange={(event) => {
            setFormState((prev) => ({ ...prev, name: event.target.value }))
          }}
        />
      </Flex>
    </FormContainer>
  )
}

EventName.displayName = 'EventName'
