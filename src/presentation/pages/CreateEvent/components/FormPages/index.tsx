import { StepContainer, StepItem } from '@/presentation/components'
import { Heading, VStack } from '@chakra-ui/react'
import { faHouse, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useCreateEventContext } from '../../context/create-event-context'
import { FormContainer } from '../FormContainer'
import { LargeItem } from '../LargeItem'

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
      <StepItem>
        <FormContainer>
          <Heading size='md'>Qual o tipo de rolê que você está oferecendo?</Heading>

          <VStack width='100%' marginTop='2rem' gap='1rem'>
            <LargeItem
              isActive
              title='Espaço fechado'
              description='Sed ut perspiciatis unde omnis iste natus error sit voluptatem.'
              icon={<FontAwesomeIcon icon={faHouse} size='1x' />}
            />

            <LargeItem
              title='Ao ar livre'
              description='Pelada com os amigos, shows, encontro de idiomas são alguns do exemplos de rolês ao ar livre.'
              icon={<FontAwesomeIcon icon={faUmbrellaBeach} size='1x' />}
            />
          </VStack>
        </FormContainer>
      </StepItem>
      <StepItem>Item 02</StepItem>
      <StepItem>Item 03</StepItem>
    </StepContainer>
  )
}

FormPages.displayName = 'FormPages'
