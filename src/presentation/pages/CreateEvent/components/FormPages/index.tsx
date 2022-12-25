import { StepContainer, StepItem } from '@/presentation/components'

import { useCreateEventContext } from '../../context/create-event-context'
import { EventCategoryPage } from './EventCategoryPage'
import { EventHasMealsPage } from './EventHasMealsPage'
import { EventMusicalStylePage } from './EventMusicalStylePage'
import { EventPricePage } from './EventPricePage'
import { EventTypePage } from './EventTypePage'

type FormPagesProps = {
  any?: any
}

export const FormPages: React.FC<FormPagesProps> = () => {
  const context = useCreateEventContext()

  // const [formState, setFormState] = useState({})

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
    </StepContainer>
  )
}

FormPages.displayName = 'FormPages'
