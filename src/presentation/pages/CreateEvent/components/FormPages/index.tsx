import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { EventCreationModel } from '@/domain/models'
import {
  makeRemoteFetchCategory,
  makeRemoteFetchEvent,
  makeRemoteFetchMusicStyle,
  makeRemoteFetchPlaceType,
} from '@/main/factories/data/usecases'
import { StepContainer, StepItem } from '@/presentation/components'
import { stepPage } from '@/presentation/components/StepPage/store/step-page'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
import { getImagePath } from '@/presentation/utils'

import { EventCategory } from './EventCategory'
import { EventDates } from './EventDates'
import { EventDescription } from './EventDescription'
import { EventHasMeals } from './EventHasMeals'
import { EventLocation } from './EventLocation'
import { EventMusicalStyle } from './EventMusicalStyle'
import { EventName } from './EventName'
import { EventPictures } from './EventPictures'
import { EventPrice } from './EventPrice'
import { EventPrivate } from './EventPrivate'
import { EventType } from './EventType'

type FormPagesProps = {
  onSubmit: (data: EventCreationModel) => void
  isLoading: boolean
}

const fetchEvent = makeRemoteFetchEvent()
const fetchPlaceType = makeRemoteFetchPlaceType()
const fetchCategory = makeRemoteFetchCategory()
const fetchMusicStyle = makeRemoteFetchMusicStyle()

export const FormPages: React.FC<React.PropsWithChildren<FormPagesProps>> = observer(
  ({ isLoading, onSubmit }) => {
    const { eventId } = useParams()

    useEffect(() => {
      stepPage.setActivePage(0) // reset page
      createEvent.resetFormData() // reset form

      if (!eventId) return

      fetchEvent.fetchById(eventId).then((res) => {
        createEvent.setFormState({
          ...res,
          categories: res.categories.map((category) => category.id),
          endDate: res.endDate ? dayjs(res.endDate).format('YYYY-MM-DD') : null,
          startDate: dayjs(res.startDate).format('YYYY-MM-DD'),
          hasMeal: Boolean(res.hasMeal),
          isPrivate: Boolean(res.isPrivate),
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
        index={stepPage.activePage || 0}
        isLoading={isLoading}
        onSubmit={() => onSubmit(createEvent.formState)}
      >
        <StepItem>
          <EventType fetchPlaceType={fetchPlaceType} />
        </StepItem>

        <StepItem>
          <EventPrivate />
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
)

FormPages.displayName = 'FormPages'
