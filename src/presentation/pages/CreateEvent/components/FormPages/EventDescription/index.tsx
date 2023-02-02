import { Flex, Heading } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'

import { useCreateEventContext } from '../../../context/create-event-context'
import { FormContainer } from '../../FormContainer'

export const EventDescription: React.FC = () => {
  const { setFormState, formState, ...context } = useCreateEventContext()

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-description-title'>
        Adicione uma descrição sobre o rolê
      </Heading>
      <Flex width='100%' marginTop='2rem' data-testid='event-description-input'>
        <Editor
          apiKey={import.meta.env.VITE_TINY_API_KEY}
          init={{
            width: '100%',
            plugins: 'lists link image paste help wordcount',
            toolbar1:
              'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify bullist numlist outdent indent  ',
          }}
          onEditorChange={(value) => {
            setFormState((prev) => ({ ...prev, description: value }))
            context.setIsNextButtonDisabled(false)
          }}
        />
      </Flex>
    </FormContainer>
  )
}

EventDescription.displayName = 'EventDescription'
