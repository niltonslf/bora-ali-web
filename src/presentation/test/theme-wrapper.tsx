import { ChakraProvider, theme } from '@chakra-ui/react'

export const ThemeWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)
