import { Button, Flex } from '@chakra-ui/react'

type FooterProps = {
  any?: any
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Flex height='6.25rem' alignItems='center' justifyContent='space-between' paddingX='1rem'>
      <Button variant='ghost'>Back</Button>
      <Button background='orange' paddingX='3rem'>
        Next
      </Button>
    </Flex>
  )
}

Footer.displayName = 'Footer'
