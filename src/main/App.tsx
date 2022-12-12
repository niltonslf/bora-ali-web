import { theme } from '@/presentation/theme'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { Routes } from './routes'

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Routes />
    </ChakraProvider>
  )
}

export default App
