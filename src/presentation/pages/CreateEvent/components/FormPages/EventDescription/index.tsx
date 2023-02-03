import { Flex, Heading } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'
import { Editor } from '@tinymce/tinymce-react'

export const EventDescription: React.FC = () => {
  const { setFormState } = useCreateEventContext()

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
          }}
        />
      </Flex>
    </FormContainer>
  )
}

EventDescription.displayName = 'EventDescription'
