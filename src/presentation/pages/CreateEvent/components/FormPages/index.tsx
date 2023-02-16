import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { EventCreationModel } from '@/domain/models'
import { FetchCategory, FetchEvent, FetchMusicStyle, FetchPlaceType } from '@/domain/usecases'
import { StepContainer, StepItem } from '@/presentation/components'
import { getImagePath } from '@/presentation/utils'
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
  fetchEvent: FetchEvent
  onSubmit: (data: EventCreationModel) => void
  isLoading: boolean
}

export const FormPages: React.FC<React.PropsWithChildren<FormPagesProps>> = ({
  fetchPlaceType,
  fetchCategory,
  fetchMusicStyle,
  fetchEvent,
  isLoading,
  onSubmit,
}) => {
  const { eventId } = useParams()
  const { formState, setFormState, ...context } = useCreateEventContext()

  useEffect(() => {
    if (!eventId) return

    fetchEvent.fetchById(eventId).then((res) => {
      console.log({ res })

      setFormState({
        id: res.id,
        address: res.address,
        categories: res.categories.map((category) => category.id),
        description: res.description,
        endDate: res.endDate ? dayjs(res.endDate).format('YYYY-MM-DD HH:mm:ss') : null,
        startDate: dayjs(res.startDate).format('YYYY-MM-DD HH:mm:ss'),
        hasMeal: Boolean(res.hasMeal),
        images: [],
        imagesUrl: res.images.map((image) => getImagePath(image.image)),
        lat: res.lat,
        lng: res.lng,
        musicStyleId: `${res.musicStyle.id}`,
        name: res.name,
        price: res.price,
        repeatDays: res.repeatDays,
        placeTypeId: `${res.placeType.id}`,
        userId: res.user.id || '',
      })
    })
  }, [eventId])

  useEffect(() => {
    if (formState.placeTypeId !== undefined) {
      context.setIsNextButtonDisabled(false)
    } else context.setIsNextButtonDisabled(true)
  }, [formState.placeTypeId])

  useEffect(() => {
    if (formState.musicStyleId !== undefined && formState.categories?.length > 0) {
      context.setIsNextButtonDisabled(false)
    } else context.setIsNextButtonDisabled(true)
  }, [formState.musicStyleId, formState.categories])

  useEffect(() => {
    if (formState.hasMeal !== undefined && formState.price !== undefined) {
      context.setIsNextButtonDisabled(false)
    } else context.setIsNextButtonDisabled(true)
  }, [formState.hasMeal, formState.price])

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
      isLoading={isLoading}
      onSubmit={() => onSubmit(formState)}
    >
      <StepItem>
        <EventType fetchPlaceType={fetchPlaceType} />
      </StepItem>

      <StepItem>
        <EventCategory fetchCategory={fetchCategory} />
        <EventMusicalStyle fetchMusicStyle={fetchMusicStyle} />
      </StepItem>

      <StepItem>
        <EventPrice />
        <EventHasMeals />
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

      <StepItem>
        <EventDates />
        <EventName />
      </StepItem>
    </StepContainer>
  )
}

FormPages.displayName = 'FormPages'
