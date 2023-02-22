import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { stepPage } from '@/presentation/components/StepPage/store/step-page'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
import { Flex, Heading } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'
import { Editor } from '@tinymce/tinymce-react'

export const EventDescription: React.FC = observer(() => {
  useEffect(() => {
    if (createEvent.formState.description?.length) stepPage.disableNextButton(false)
    else stepPage.disableNextButton(true)
  }, [createEvent.formState.description])

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
          value={createEvent.formState.description}
          onEditorChange={(value) => {
            createEvent.setFormState({ ...createEvent.formState, description: value })
          }}
        />
      </Flex>
    </FormContainer>
  )
})

EventDescription.displayName = 'EventDescription'
