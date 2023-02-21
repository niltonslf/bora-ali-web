import { observer } from 'mobx-react-lite'

import { EventCreationModel } from '@/domain/models'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
import { Button, Flex } from '@chakra-ui/react'

type FooterProps = {
  onSubmit: (formState: EventCreationModel) => void
  isLoading: boolean
}

export const Footer: React.FC<FooterProps> = observer(({ onSubmit, isLoading = false }) => {
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
        disabled={createEvent.isFirst}
        onClick={() => createEvent.setActivePage(createEvent.activePage - 1)}
      >
        Back
      </Button>

      {createEvent.isLast ? (
        <Button
          background='orange'
          paddingX='3rem'
          data-testid='submit-button'
          disabled={createEvent.isNextButtonDisabled}
          onClick={() => onSubmit(createEvent.formState)}
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
          disabled={createEvent.isNextButtonDisabled}
          onClick={() => {
            createEvent.setActivePage(createEvent.activePage + 1)
            createEvent.disableNextButton(true)
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
})

Footer.displayName = 'Footer'
