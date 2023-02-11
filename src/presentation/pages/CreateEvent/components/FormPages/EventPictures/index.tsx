import React, { useEffect, useRef } from 'react'

import { AddFileBox } from '@/presentation/components'
import { Button, Flex, Grid, Heading, Img, Input } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'

export const EventPictures: React.FC = () => {
  const inputRef = useRef<any>(null)
  const { setFormState, formState, ...context } = useCreateEventContext()

  const filesArray = Array.from(formState.images || [])

  const onChangeFile = (event: React.BaseSyntheticEvent) => {
    setFormState((prev) => ({ ...prev, images: event.target.files }))
  }
  const onClear = () => {
    inputRef.current?.reset()
    setFormState((prev) => ({ ...prev, images: [] }))
  }

  const removeGoogleImages = () => {
    setFormState((prev) => ({ ...prev, imagesUrl: [] }))
  }

  useEffect(() => {
    if (formState.images?.length || formState.imagesUrl.length)
      context.setIsNextButtonDisabled(false)
    else context.setIsNextButtonDisabled(true)
  }, [])

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
        {formState.images === undefined || formState.images?.length === 0 ? (
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
            const preview = URL.createObjectURL(file as any)
            return <Img src={preview} key={index} width='100%' height='100%' objectFit='cover' />
          })}
        </Grid>
      )}

      {formState.imagesUrl.length > 0 && (
        <>
          <Flex justifyContent='space-between' alignItems='center' flex={1}>
            <Heading
              size='md'
              data-testid='event-pictures-title'
              marginTop='1rem'
              marginBottom='1rem'
            >
              Imagens capturadas automaticamente
            </Heading>

            <Button colorScheme='red' size='sm' onClick={removeGoogleImages}>
              Remover
            </Button>
          </Flex>

          <Grid gridTemplateColumns='1fr 1fr 1fr 1fr 1fr' gap='1rem' data-testid='pictures-preview'>
            {formState.imagesUrl.map((image, index) => {
              return <Img src={image} key={index} width='100%' height='100%' objectFit='cover' />
            })}
          </Grid>
        </>
      )}
    </FormContainer>
  )
}

EventPictures.displayName = 'EventPictures'
