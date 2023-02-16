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
      setFormState({
        ...res,
        categories: res.categories.map((category) => category.id),
        endDate: res.endDate ? dayjs(res.endDate).format('YYYY-MM-DD HH:mm:ss') : null,
        startDate: dayjs(res.startDate).format('YYYY-MM-DD HH:mm:ss'),
        hasMeal: Boolean(res.hasMeal),
        images: [],
        imagesUrl: res.images.map((image) => getImagePath(image.image)),
        musicStyleId: `${res.musicStyle.id}`,
        placeTypeId: `${res.placeType.id}`,
        userId: res.user.id || '',
      })
    })
  }, [eventId])

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
      </StepItem>

      <StepItem>
        <EventMusicalStyle fetchMusicStyle={fetchMusicStyle} />
      </StepItem>

      <StepItem>
        <EventPrice />
      </StepItem>

      <StepItem>
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
      </StepItem>

      <StepItem>
        <EventName />
      </StepItem>
    </StepContainer>
  )
}

FormPages.displayName = 'FormPages'
