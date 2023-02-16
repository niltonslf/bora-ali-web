import { useEffect } from 'react'

import { Flex, Heading } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'
import { Editor } from '@tinymce/tinymce-react'

export const EventDescription: React.FC = () => {
  const { setFormState, formState, ...context } = useCreateEventContext()

  useEffect(() => {
    if (formState.description?.length) context.setIsNextButtonDisabled(false)
    else context.setIsNextButtonDisabled(true)
  }, [formState.description])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-description-title'>
        Adicione uma descrição sobre o rolê
      </Heading>
      <Flex width='100%' marginTop='2rem' data-testid='event-description-input'>
        <Editor
          apiKey={import.meta.env.VITE_TINY_API_KEY}
          init={{
            menubar: false,
            width: '100%',
            plugins: 'lists link image paste',
            toolbar1:
              'blocks | bold italic | alignleft aligncenter alignright alignjustify bullist outdent indent | image link ',
          }}
          value={formState.description}
          onEditorChange={(value) => {
            setFormState((prev) => ({ ...prev, description: value }))
          }}
        />
      </Flex>
    </FormContainer>
  )
}

EventDescription.displayName = 'EventDescription'
