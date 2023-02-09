import { useEffect } from 'react'

import { FetchCategory, FetchMusicStyle, FetchPlaceType } from '@/domain/usecases'
import { StepContainer, StepItem } from '@/presentation/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'

import { EventCategory } from './EventCategory'
import { EventDates } from './EventDates'
import { EventDescription } from './EventDescription'
import { EventHasMeals } from './EventHasMeals'
import { EventLocation } from './EventLocation'
import { EventMusicalStyle } from './EventMusicalStyle'
import { EventName } from './EventName'
import { EventPictures } from './EventPictures'
import { EventPrice } from './EventPrice'
import { EventType } from './EventType'

type FormPagesProps = {
  fetchPlaceType: FetchPlaceType
  fetchCategory: FetchCategory
  fetchMusicStyle: FetchMusicStyle
}

export const FormPages: React.FC<FormPagesProps> = ({
  fetchPlaceType,
  fetchCategory,
  fetchMusicStyle,
}) => {
  const { formState, ...context } = useCreateEventContext()

  useEffect(() => {
    if (formState.placeTypeId !== undefined) {
      context.setIsNextButtonDisabled(false)
    } else context.setIsNextButtonDisabled(true)
  }, [formState.placeTypeId])

  useEffect(() => {
    if (
      formState.hasMeal !== undefined &&
      formState.musicStyleId !== undefined &&
      formState.categories?.length > 0
    ) {
      context.setIsNextButtonDisabled(false)
    } else context.setIsNextButtonDisabled(true)
  }, [formState.hasMeal, formState.musicStyleId, formState.categories])

  useEffect(() => {
    if (formState.price !== undefined) {
      context.setIsNextButtonDisabled(false)
    } else context.setIsNextButtonDisabled(true)
  }, [formState.price])

  useEffect(() => {
    if (
      formState.lat !== undefined &&
      formState.lng !== undefined &&
      formState.address !== undefined
    ) {
      context.setIsNextButtonDisabled(false)
    } else context.setIsNextButtonDisabled(true)
  }, [formState.lat, formState.lng, formState.address])

  useEffect(() => {
    if (formState.description?.length > 0) {
      context.setIsNextButtonDisabled(false)
    } else context.setIsNextButtonDisabled(true)
  }, [formState.description])

  useEffect(() => {
    if (formState.images?.length > 0) {
      context.setIsNextButtonDisabled(false)
    } else context.setIsNextButtonDisabled(true)
  }, [formState.images])

  useEffect(() => {
    if (
      formState.startDate !== undefined &&
      formState.endDate !== undefined &&
      formState.name !== undefined
    ) {
      context.setIsNextButtonDisabled(false)
    } else context.setIsNextButtonDisabled(true)
  }, [formState.startDate, formState.endDate, formState.name])

  return (
    <StepContainer
      index={context.activePage}
      isFirst={context.setIsFirst}
      isLast={context.setIsLast}
    >
      <StepItem>
        <EventDates />
        <EventName />
      </StepItem>

      <StepItem>
        <EventType fetchPlaceType={fetchPlaceType} />
      </StepItem>

      <StepItem>
        <EventCategory fetchCategory={fetchCategory} />
        <EventMusicalStyle fetchMusicStyle={fetchMusicStyle} />
        <EventHasMeals />
      </StepItem>

      <StepItem>
        <EventPrice />
      </StepItem>

      <StepItem>
        <EventLocation />
      </StepItem>

      <StepItem>
        <EventDescription />
      </StepItem>

      <StepItem>
        <EventPictures />
      </StepItem>
    </StepContainer>
  )
}

FormPages.displayName = 'FormPages'
