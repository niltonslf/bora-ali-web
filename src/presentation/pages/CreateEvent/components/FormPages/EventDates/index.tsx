import { useEffect } from 'react'

import { formatDateAndTime, parseDateToNumber } from '@/presentation/utils/date'
import { Flex, Heading, Input } from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components/'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'

export const EventDates: React.FC = () => {
  const { setFormState, formState, ...context } = useCreateEventContext()

  useEffect(() => {
    if (formState.startDate && formState.endDate) context.setIsNextButtonDisabled(false)
    else context.setIsNextButtonDisabled(true)
  }, [])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-dates-title'>
        Qual a data de início e término do rolê?
      </Heading>
      <Flex width='100%' marginTop='2rem' gap='1rem'>
        <Input
          data-testid='event-start-input'
          width='100%'
          value={formatDateAndTime(formState.startDate)}
          placeholder='Select start date'
          size='md'
          type='date'
          onChange={(event) => {
            console.log(event.target.value)
            setFormState((prev) => ({ ...prev, startDate: parseDateToNumber(event.target.value) }))
          }}
        />

        <Input
          data-testid='event-end-input'
          width='100%'
          value={formatDateAndTime(formState.endDate)}
          placeholder='Select end date'
          size='md'
          type='date'
          onChange={(event) => {
            setFormState((prev) => ({ ...prev, endDate: parseDateToNumber(event.target.value) }))
          }}
        />
      </Flex>
    </FormContainer>
  )
}

EventDates.displayName = 'EventDates'
