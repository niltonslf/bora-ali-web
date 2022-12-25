import { EventCreationModel } from '@/domain/models'
import { useCreateEventContext } from '@/presentation/pages/CreateEvent/context/create-event-context'
import { Button, Flex } from '@chakra-ui/react'

type FooterProps = {
  onSubmit: (formState: EventCreationModel) => void
}

export const Footer: React.FC<FooterProps> = ({ onSubmit }) => {
  const context = useCreateEventContext()
  return (
    <Flex height='70px' alignItems='center' justifyContent='space-between' paddingX='1rem'>
      <Button
        variant='ghost'
        disabled={context.isFirst}
        onClick={() => context.setActivePage(context.activePage - 1)}
      >
        Back
      </Button>

      {context.isLast ? (
        <Button background='orange' paddingX='3rem' onClick={() => onSubmit(context.formState)}>
          Submit
        </Button>
      ) : (
        <Button
          background='orange'
          paddingX='3rem'
          onClick={() => context.setActivePage(context.activePage + 1)}
        >
          Next
        </Button>
      )}
    </Flex>
  )
}

Footer.displayName = 'Footer'
