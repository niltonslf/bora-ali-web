import { formatDateAndTime, parseDateToNumber } from '@/presentation/utils/date'
import { Flex, Heading, Input } from '@chakra-ui/react'

import { useCreateEventContext } from '../../../context/create-event-context'
import { FormContainer } from '../../FormContainer'

export const EventDates: React.FC = () => {
  const { setFormState, formState, ...context } = useCreateEventContext()

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-dates-title'>
        Qual a data de início e término do rolê?
      </Heading>
      <Flex width='100%' marginTop='2rem' gap='1rem'>
        <Input
          data-testid='event-start-input'
          width='100%'
          value={formatDateAndTime(formState.startDate ?? new Date().getTime())}
          placeholder='Select start date and time'
          size='md'
          type='datetime-local'
          onChange={(event) => {
            setFormState((prev) => ({ ...prev, startDate: parseDateToNumber(event.target.value) }))
            context.setIsNextButtonDisabled(false)
          }}
        />

        <Input
          data-testid='event-end-input'
          width='100%'
          value={formatDateAndTime(formState.endDate ?? new Date().getTime())}
          placeholder='Select end date and time'
          size='md'
          type='datetime-local'
          onChange={(event) => {
            setFormState((prev) => ({ ...prev, endDate: parseDateToNumber(event.target.value) }))
            context.setIsNextButtonDisabled(false)
          }}
        />
      </Flex>
    </FormContainer>
  )
}

EventDates.displayName = 'EventDates'
