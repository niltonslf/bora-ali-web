import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EventCreationModel } from '@/domain/models'
import { PersistEvent } from '@/domain/usecases/persist-event'
import { Header } from '@/presentation/components'
import { useAuth } from '@/presentation/hooks/use-auth'
import { Flex, useToast } from '@chakra-ui/react'

import { FormPages } from './components/FormPages'
import { formatPrice } from './utils/format-price'

type CreateEventProps = {
  createEvent: PersistEvent
}

export const CreateEvent: React.FC<CreateEventProps> = observer(({ createEvent }) => {
  const toast = useToast()
  const navigation = useNavigate()
  const { getCurrentAccount } = useAuth()
  const account = getCurrentAccount()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (formState: EventCreationModel) => {
    try {
      setIsLoading(true)
      if (formState.id !== undefined) await handleUpdate(formState)
      else await handleCreate(formState)

      toast({
        title: `Evento ${formState.id ? 'atualizado' : 'cadastrado'} com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      if (formState.id === undefined) navigation('/')
      else navigation('/profile')
    } catch (error) {
      console.log({ error })
      toast({
        title: `Error ao ${formState.id ? 'atualizar' : 'cadastrar'} evento.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const prepareFormData = (formState: EventCreationModel): FormData => {
    const formData = new FormData()

    formState.price = formatPrice(formState.price)

    // @ts-expect-error
    for (const key in formState) formData.append(key, formState[key])

    if (formState.images)
      Array.from(formState.images).forEach((image) => formData.append('images', image as any))

    return formData
  }

  const handleCreate = async (formState: EventCreationModel) => {
    if (!account.id) throw new Error('User missing')

    const formData = prepareFormData(formState)
    formData.append('userId', account.id)
    await createEvent.create(formData)
  }

  const handleUpdate = async (formState: EventCreationModel) => {
    if (!account.id || !formState.id) throw new Error('data missing')

    const formData = prepareFormData(formState)
    await createEvent.update(formData, formState.id)
  }

  return (
    <Flex direction='column' width='100%' minHeight='100vh' justifyContent='space-between'>
      <Header />
      <FormPages onSubmit={onSubmit} isLoading={isLoading} />
    </Flex>
  )
})

CreateEvent.displayName = 'CreateEvent'
