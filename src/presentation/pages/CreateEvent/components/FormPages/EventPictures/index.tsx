import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'

import { AddFileBox } from '@/presentation/components'
import { Button, Flex, Grid, Heading, Img, Input } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'
import { createEvent } from '@pages/CreateEvent/context/create-event'

export const EventPictures: React.FC = observer(() => {
  const inputRef = useRef<any>(null)

  const filesArray = Array.from(createEvent.formState.images || [])

  const onChangeFile = (event: React.BaseSyntheticEvent) => {
    createEvent.setFormState({ ...createEvent.formState, images: event.target.files })
  }
  const onClear = () => {
    inputRef.current?.reset()
    createEvent.setFormState({ ...createEvent.formState, images: [] })
  }

  const removeGoogleImages = () => {
    createEvent.setFormState({ ...createEvent.formState, imagesUrl: [] })
  }

  useEffect(() => {
    if (createEvent.formState.images?.length || createEvent.formState.imagesUrl?.length)
      createEvent.disableNextButton(false)
    else createEvent.disableNextButton(true)
  }, [createEvent.formState.images, createEvent.formState.imagesUrl])

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
        {createEvent.formState.images === undefined ||
        createEvent.formState.images?.length === 0 ? (
          <AddFileBox htmlFor='pictures-input' data-testid='file-box' />
        ) : (
          <Flex justifyContent='flex-end' width='100%'>
            <Button
              alignSelf='flex-start'
              colorScheme='red'
              marginBottom='1rem'
              onClick={onClear}
              data-testid='reset-button'
              size='sm'
            >
              Remover
            </Button>
          </Flex>
        )}
      </Flex>

      {filesArray.length !== 0 && (
        <Grid gridTemplateColumns='1fr 1fr' gap='1rem' data-testid='pictures-preview'>
          {filesArray.map((file, index) => {
            const preview = URL.createObjectURL(file as any)
            return <Img src={preview} key={index} width='100%' height='100%' objectFit='cover' />
          })}
        </Grid>
      )}

      {createEvent.formState.imagesUrl?.length > 0 && (
        <>
          <Flex justifyContent='space-between' alignItems='center' flex={1}>
            <Heading
              size='md'
              data-testid='event-pictures-title'
              marginTop='1rem'
              marginBottom='1rem'
            >
              Imagens salvas
            </Heading>

            <Button colorScheme='red' size='sm' onClick={removeGoogleImages}>
              Remover
            </Button>
          </Flex>

          <Grid
            gridTemplateColumns='1fr 1fr 1fr 1fr 1fr'
            gap='1rem'
            data-testid='pictures-preview'
            width='100%'
          >
            {createEvent.formState.imagesUrl.map((image, index) => {
              return <Img src={image} key={index} width='100%' height='100%' objectFit='cover' />
            })}
          </Grid>
        </>
      )}
    </FormContainer>
  )
})

EventPictures.displayName = 'EventPictures'
