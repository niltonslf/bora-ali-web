import React, { useRef, useState } from 'react'

import { AddFileBox } from '@/presentation/components'
import { Button, Flex, Grid, Heading, Img, Input } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'

export const EventPictures: React.FC = () => {
  const inputRef = useRef<any>(null)
  const { setFormState } = useCreateEventContext()

  const [fileInput, setFileInput] = useState<FileList>()
  const filesArray = Array.from(fileInput || [])

  const onChangeFile = (event: React.BaseSyntheticEvent) => {
    setFileInput(event.target.files)
    setFormState((prev) => ({ ...prev, images: event.target.files }))
  }
  const onClear = () => {
    inputRef.current?.reset()
    setFileInput(undefined)
  }

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-pictures-title'>
        Adicione algumas fotos
      </Heading>
      <Flex as='form' ref={inputRef} width='100%' marginTop='2rem'>
        <Input
          width='100%'
          type='file'
          hidden
          multiple
          id='pictures-input'
          data-testid='file-input'
          onChange={onChangeFile}
        />
        {!fileInput ? (
          <AddFileBox htmlFor='pictures-input' data-testid='file-box' />
        ) : (
          <Flex justifyContent='flex-end' width='100%'>
            <Button
              alignSelf='flex-start'
              colorScheme='red'
              marginBottom='1rem'
              onClick={onClear}
              data-testid='reset-button'
            >
              Delete pictures
            </Button>
          </Flex>
        )}
      </Flex>

      {filesArray.length !== 0 && (
        <Grid gridTemplateColumns='1fr 1fr' gap='1rem' data-testid='pictures-preview'>
          {filesArray.map((file, index) => {
            const preview = URL.createObjectURL(file)
            return <Img src={preview} key={index} width='100%' height='100%' objectFit='cover' />
          })}
        </Grid>
      )}
    </FormContainer>
  )
}

EventPictures.displayName = 'EventPictures'
