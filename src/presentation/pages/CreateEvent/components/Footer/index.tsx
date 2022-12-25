import { useCreateEventContext } from '@/presentation/pages/CreateEvent/context/create-event-context'
import { Button, Flex } from '@chakra-ui/react'

export const Footer: React.FC = () => {
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

      <Button
        background='orange'
        paddingX='3rem'
        disabled={context.isLast}
        onClick={() => context.setActivePage(context.activePage + 1)}
      >
        Next
      </Button>
    </Flex>
  )
}

Footer.displayName = 'Footer'
