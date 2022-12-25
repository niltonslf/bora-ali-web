import { Flex, Heading, Input } from '@chakra-ui/react'

import { useCreateEventContext } from '../../context/create-event-context'
import { FormContainer } from '../FormContainer'

export const EventPicturesPage: React.FC = () => {
  const { setFormState, formState } = useCreateEventContext()

  return (
    <FormContainer>
      <Heading size='md'>Por último, dê um nome que melhor descreve o seu rolê</Heading>
      <Flex width='100%' marginTop='2rem'>
        <Input
          width='100%'
          value={formState.name}
          onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
        />
      </Flex>
    </FormContainer>
  )
}

EventPicturesPage.displayName = 'EventPicturesPage'
