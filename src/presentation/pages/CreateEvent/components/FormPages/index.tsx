import { FetchCategory, FetchMusicStyle, FetchPlaceType } from '@/domain/usecases'
import { StepContainer, StepItem } from '@/presentation/components'

import { useCreateEventContext } from '../../context/create-event-context'
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
  const context = useCreateEventContext()

  return (
    <StepContainer
      index={context.activePage}
      isFirst={context.setIsFirst}
      isLast={context.setIsLast}
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
