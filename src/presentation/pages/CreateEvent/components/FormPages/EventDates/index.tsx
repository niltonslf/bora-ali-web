import { DatePicker, TimePicker } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { formatDateFromBrToDb } from '@/presentation/utils/date'
import {
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import { FormContainer } from '@pages/CreateEvent/components/'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'

enum EventRepetition {
  DOES_NOT_REPEAT = '1',
  REPEAT = '2',
}

export const EventDates: React.FC = () => {
  const { setFormState, formState, ...context } = useCreateEventContext()

  const [repeat, setRepeat] = useState(EventRepetition.DOES_NOT_REPEAT)

  const onChangeStart = (value: any, startDate: string) => {
    setFormState((prev) => ({ ...prev, startDate: formatDateFromBrToDb(startDate) }))
  }

  const onChangeEnd = (value: any, endDate: string) => {
    setFormState((prev) => ({ ...prev, endDate: formatDateFromBrToDb(endDate) }))
  }

  const onChangeOpenTime = (value: any, startTime: string) => {
    setFormState((prev) => ({ ...prev, startTime }))
  }

  const onChangeCloseTime = (value: any, endTime: string) => {
    setFormState((prev) => ({ ...prev, endTime }))
  }

  const onChangeRadio = (value: EventRepetition) => {
    setRepeat(value)

    if (value === EventRepetition.DOES_NOT_REPEAT) {
      setFormState((prev) => ({ ...prev, repeatDays: null }))
    }
  }

  const onChangeRepeatDays = (value: any) => {
    setFormState((prev) => ({ ...prev, repeatDays: value }))
  }

  useEffect(() => {
    if (formState.repeatDays?.length) setRepeat(EventRepetition.REPEAT)
  }, [])

  useEffect(() => {
    if (
      formState.startDate !== undefined &&
      formState.startTime !== undefined &&
      formState.endTime !== undefined
    )
      context.setIsNextButtonDisabled(false)
    else context.setIsNextButtonDisabled(true)
  }, [formState.startDate, formState.startTime, formState.endTime])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-dates-title'>
        Qual a data de início e término do rolê?
      </Heading>

      <Flex width='100%' marginTop='2rem' gap='1rem' flexWrap='wrap'>
        <HStack width='100%'>
          <DatePicker
            size='large'
            placeholder='Início'
            data-testid='event-start-input'
            format='DD/MM/YYYY'
            value={dayjs(formState.startDate || new Date().getTime())}
            onChange={onChangeStart}
            allowClear={false}
          />
          <TimePicker
            size='large'
            format='HH:mm'
            placeholder='Abertura'
            value={dayjs(formState.startTime, 'HH:mm:ss')}
            onChange={onChangeOpenTime}
            allowClear={false}
          />
        </HStack>

        <HStack width='100%'>
          <DatePicker
            size='large'
            placeholder='Término (opcional)'
            data-testid='event-start-input'
            format='DD/MM/YYYY'
            value={dayjs(formState.endDate).isValid() ? dayjs(formState.endDate) : undefined}
            onChange={onChangeEnd}
            allowClear={false}
          />
          <TimePicker
            size='large'
            format='HH:mm'
            placeholder='Fechamento'
            value={dayjs(formState.endTime, 'HH:mm:ss')}
            onChange={onChangeCloseTime}
            allowClear={false}
          />
        </HStack>

        <RadioGroup onChange={onChangeRadio} value={repeat}>
          <Stack direction='row'>
            <Radio value={EventRepetition.DOES_NOT_REPEAT}>Não repete</Radio>
            <Radio value={EventRepetition.REPEAT}>Repete</Radio>
          </Stack>
        </RadioGroup>

        {repeat === EventRepetition.REPEAT && (
          <HStack width='100%'>
            <CheckboxGroup onChange={onChangeRepeatDays} value={formState.repeatDays || []}>
              <Checkbox value='monday'>Seg</Checkbox>
              <Checkbox value='tuesday'>Ter</Checkbox>
              <Checkbox value='wednesday'>Qua</Checkbox>
              <Checkbox value='thursday'>Qui</Checkbox>
              <Checkbox value='friday'>Sex</Checkbox>
              <Checkbox value='saturday'>Sáb</Checkbox>
              <Checkbox value='sunday'>Dom</Checkbox>
            </CheckboxGroup>
          </HStack>
        )}
      </Flex>
    </FormContainer>
  )
}

EventDates.displayName = 'EventDates'
