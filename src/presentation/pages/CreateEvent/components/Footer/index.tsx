import { EventCreationModel } from '@/domain/models'
import { useCreateEventContext } from '@/presentation/pages/CreateEvent/context/create-event-context'
import { Button, Flex } from '@chakra-ui/react'

type FooterProps = {
  onSubmit: (formState: EventCreationModel) => void
  isLoading: boolean
}

export const Footer: React.FC<FooterProps> = ({ onSubmit, isLoading = false }) => {
  const context = useCreateEventContext()
  return (
    <Flex
      height='70px'
      alignItems='center'
      justifyContent='space-between'
      paddingX='1rem'
      data-testid='navigation-bar'
    >
      <Button
        variant='ghost'
        disabled={context.isFirst}
        onClick={() => context.setActivePage(context.activePage - 1)}
      >
        Back
      </Button>

      {context.isLast ? (
        <Button
          background='orange'
          paddingX='3rem'
          data-testid='submit-button'
          disabled={context.isNextButtonDisabled}
          onClick={() => onSubmit(context.formState)}
          isLoading={isLoading}
          _hover={{
            background: 'orange',
          }}
        >
          Submit
        </Button>
      ) : (
        <Button
          background='orange'
          paddingX='3rem'
          disabled={context.isNextButtonDisabled}
          onClick={() => {
            context.setActivePage(context.activePage + 1)
            context.setIsNextButtonDisabled(true)
          }}
          data-testid='next-button'
          _hover={{
            background: 'orange',
          }}
        >
          Next
        </Button>
      )}
    </Flex>
  )
}

Footer.displayName = 'Footer'
