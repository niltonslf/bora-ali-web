import { DatePicker, TimePicker } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { stepPage } from '@/presentation/components/StepPage/store/step-page'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
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

enum EventRepetition {
  DOES_NOT_REPEAT = '1',
  REPEAT = '2',
}

export const EventDates: React.FC = observer(() => {
  const [repeat, setRepeat] = useState(EventRepetition.DOES_NOT_REPEAT)

  const onChangeStart = (value: any, startDate: string) => {
    createEvent.setFormState({
      ...createEvent.formState,
      startDate: formatDateFromBrToDb(startDate),
    })
  }

  const onChangeEnd = (value: any, endDate: string) => {
    createEvent.setFormState({ ...createEvent.formState, endDate: formatDateFromBrToDb(endDate) })
  }

  const onChangeOpenTime = (value: any, startTime: string) => {
    createEvent.setFormState({ ...createEvent.formState, startTime })
  }

  const onChangeCloseTime = (value: any, endTime: string) => {
    createEvent.setFormState({ ...createEvent.formState, endTime })
  }

  const onChangeRadio = (value: EventRepetition) => {
    setRepeat(value)

    if (value === EventRepetition.DOES_NOT_REPEAT) {
      createEvent.setFormState({ ...createEvent.formState, repeatDays: null })
    }
  }

  const onChangeRepeatDays = (value: any) => {
    createEvent.setFormState({ ...createEvent.formState, repeatDays: value })
  }

  useEffect(() => {
    if (createEvent.formState.repeatDays?.length) setRepeat(EventRepetition.REPEAT)
  }, [])

  useEffect(() => {
    if (
      createEvent.formState.startDate !== undefined &&
      createEvent.formState.startTime !== undefined &&
      createEvent.formState.endTime !== undefined
    )
      stepPage.disableNextButton(false)
    else stepPage.disableNextButton(true)
  }, [
    createEvent.formState.startDate,
    createEvent.formState.startTime,
    createEvent.formState.endTime,
  ])

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
            value={dayjs(createEvent.formState.startDate || new Date().getTime())}
            onChange={onChangeStart}
            allowClear={false}
          />
          <TimePicker
            size='large'
            format='HH:mm'
            placeholder='Abertura'
            value={
              dayjs(createEvent.formState.startTime, 'HH:mm:ss').isValid()
                ? dayjs(createEvent.formState.startTime, 'HH:mm:ss')
                : undefined
            }
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
            value={
              dayjs(createEvent.formState.endDate).isValid()
                ? dayjs(createEvent.formState.endDate)
                : undefined
            }
            onChange={onChangeEnd}
            allowClear={false}
          />
          <TimePicker
            size='large'
            format='HH:mm'
            placeholder='Fechamento'
            value={
              dayjs(createEvent.formState.endTime, 'HH:mm:ss').isValid()
                ? dayjs(createEvent.formState.endTime, 'HH:mm:ss')
                : undefined
            }
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
            <CheckboxGroup
              onChange={onChangeRepeatDays}
              value={createEvent.formState.repeatDays || []}
            >
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
})

EventDates.displayName = 'EventDates'
