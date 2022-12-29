import { FetchPlaceType } from '@/domain/usecases'
import { StepContainer, StepItem } from '@/presentation/components'

import { useCreateEventContext } from '../../context/create-event-context'
import { EventCategory } from './EventCategory'
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
}

export const FormPages: React.FC<FormPagesProps> = ({ fetchPlaceType }) => {
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
        <EventCategory />
      </StepItem>

      <StepItem>
        <EventMusicalStyle />
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
        <EventName />
      </StepItem>
    </StepContainer>
  )
}

FormPages.displayName = 'FormPages'
