import { useStepPage } from '@/presentation/components'
import { Button, Flex } from '@chakra-ui/react'

type FooterProps = {
  any?: any
}

export const Footer: React.FC<FooterProps> = () => {
  const context = useStepPage()

  return (
    <Flex height='6.25rem' alignItems='center' justifyContent='space-between' paddingX='1rem'>
      <Button variant='ghost' onClick={() => context.previousPage()}>
        Back
      </Button>
      <Button background='orange' paddingX='3rem' onClick={() => context.nextPage()}>
        Next
      </Button>
    </Flex>
  )
}

Footer.displayName = 'Footer'
