import React, { useState } from 'react'

import { AddFileBox } from '@/presentation/components'
import { useCreateEventContext } from '@/presentation/pages/CreateEvent/context/create-event-context'
import { Button, Flex, Grid, Heading, Img, Input } from '@chakra-ui/react'

import { FormContainer } from '../../FormContainer'

export const EventPictures: React.FC = () => {
  const { setFormState } = useCreateEventContext()

  const [fileInput, setFileInput] = useState<FileList>()
  const filesArray = Array.from(fileInput || [])

  const onChangeFile = (event: React.BaseSyntheticEvent) => {
    setFileInput(event.target.files)
    setFormState((prev) => ({ ...prev, images: event.target.files }))
  }
  const onClear = () => {
    setFileInput(undefined)
  }

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-pictures-title'>
        Adicione algumas fotos
      </Heading>
      <Flex width='100%' marginTop='2rem'>
        <Input
          width='100%'
          type='file'
          multiple
          hidden
          id='pictures-input'
          data-testid='pictures-input'
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
