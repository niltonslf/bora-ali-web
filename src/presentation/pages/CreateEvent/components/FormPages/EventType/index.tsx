import { useEffect, useState } from 'react'

import { PlaceTypeModel } from '@/domain/models'
import { FetchPlaceType } from '@/domain/usecases'
import { Heading, useRadioGroup, VStack } from '@chakra-ui/react'
import { FormContainer, OptionItem } from '@pages/CreateEvent/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'

type EventTypeProps = {
  fetchPlaceType: FetchPlaceType
}

export const EventType: React.FC<EventTypeProps> = ({ fetchPlaceType }) => {
  const [options, setOptions] = useState<PlaceTypeModel[]>([])

  const { setFormState, formState, ...context } = useCreateEventContext()
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'eventType',
    value: formState.placeTypeId,
    onChange: (value) => {
      setFormState((prev) => ({ ...prev, placeTypeId: value }))
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const placeTypes = await fetchPlaceType.fetchAll()
      setOptions(placeTypes)
    }
    fetchData()

    if (formState.placeTypeId) context.setIsNextButtonDisabled(false)
    else context.setIsNextButtonDisabled(true)
  }, [])

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
                key={value.id}
                title={value.name}
                description={value.description}
              />
            )
          })}
        </VStack>
      )}
    </FormContainer>
  )
}

EventType.displayName = 'EventType'
