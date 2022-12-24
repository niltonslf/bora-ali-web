import { StepContainer, StepItem } from '@/presentation/components'

import { useCreateEventContext } from '../../context/create-event-context'

type FormPagesProps = {
  any?: any
}

export const FormPages: React.FC<FormPagesProps> = () => {
  const context = useCreateEventContext()

  return (
    <StepContainer
      index={context.activePage}
      isFirst={context.setIsFirst}
      isLast={context.setIsLast}
    >
      <StepItem>Item 01</StepItem>
      <StepItem>Item 02</StepItem>
      <StepItem>Item 03</StepItem>
    </StepContainer>
  )
}

FormPages.displayName = 'FormPages'
