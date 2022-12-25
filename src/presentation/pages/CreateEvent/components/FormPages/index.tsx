import { StepContainer, StepItem } from '@/presentation/components'

import { useCreateEventContext } from '../../context/create-event-context'
import { EventCategoryPage } from './EventCategoryPage'
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
      <StepItem>Item 03</StepItem>
    </StepContainer>
  )
}

FormPages.displayName = 'FormPages'
