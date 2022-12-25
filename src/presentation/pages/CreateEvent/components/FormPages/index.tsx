import { StepContainer, StepItem } from '@/presentation/components'

import { useCreateEventContext } from '../../context/create-event-context'
import { EventCategoryPage } from './EventCategoryPage'
import { EventDescriptionPage } from './EventDescriptionPage'
import { EventHasMealsPage } from './EventHasMealsPage'
import { EventLocation } from './EventLocationPage'
import { EventMusicalStylePage } from './EventMusicalStylePage'
import { EventNamePage } from './EventNamePage'
import { EventPricePage } from './EventPricePage'
import { EventTypePage } from './EventTypePage'

export const FormPages: React.FC = () => {
  const context = useCreateEventContext()

  return (
    <StepContainer
      index={context.activePage}
      isFirst={context.setIsFirst}
      isLast={context.setIsLast}
    >
      <StepItem>
        <EventTypePage />
      </StepItem>

      <StepItem>
        <EventCategoryPage />
      </StepItem>

      <StepItem>
        <EventMusicalStylePage />
      </StepItem>

      <StepItem>
        <EventHasMealsPage />
      </StepItem>

      <StepItem>
        <EventPricePage />
      </StepItem>

      <StepItem>
        <EventLocation />
      </StepItem>

      <StepItem>
        <EventDescriptionPage />
      </StepItem>

      <StepItem>
        <EventNamePage />
      </StepItem>
    </StepContainer>
  )
}

FormPages.displayName = 'FormPages'
