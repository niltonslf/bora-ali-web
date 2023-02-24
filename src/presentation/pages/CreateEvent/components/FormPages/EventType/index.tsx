import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { RemoteFetchPlaceType } from '@/data/usecases'
import { PlaceTypeModel } from '@/domain/models'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { stepPage } from '@/presentation/components/StepPage/store/step-page'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
import { Heading, useRadioGroup, VStack } from '@chakra-ui/react'
import { FormContainer, OptionItem } from '@pages/CreateEvent/components'

type EventTypeProps = {
  any?: any
}

const axios = makeAuthorizeHttpClientDecorator()
const fetchPlaceType = new RemoteFetchPlaceType(axios)

export const EventType: React.FC<EventTypeProps> = observer(() => {
  const [options, setOptions] = useState<PlaceTypeModel[]>([])

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'eventType',
    value: createEvent.formState.placeTypeId,
    onChange: (value) => {
      createEvent.setFormState({ ...createEvent.formState, placeTypeId: value })
    },
  })

  useEffect(() => {
    fetchPlaceType.fetchAll().then(setOptions)
  }, [])

  useEffect(() => {
    if (createEvent.formState.placeTypeId !== undefined) stepPage.disableNextButton(false)
    else stepPage.disableNextButton(true)
  }, [createEvent.formState.placeTypeId])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-type-title'>
        Qual o tipo de rolê que você está oferecendo?
      </Heading>

      {options.length > 0 && (
        <VStack
          width='100%'
          marginTop='2rem'
          gap='1rem'
          data-testid='event-types'
          {...getRootProps()}
        >
          {options?.map((value) => {
            const radio = getRadioProps({ value: `${value.id}` })
            return (
              <OptionItem
                {...radio}
                key={`type-${value.id}`}
                title={value.name}
                description={value.description}
              />
            )
          })}
        </VStack>
      )}
    </FormContainer>
  )
})

EventType.displayName = 'EventType'
