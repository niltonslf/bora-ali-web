import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

import { theme } from '@/presentation/theme'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { Routes } from './routes'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'bora-ali-3c639.firebaseapp.com',
  projectId: 'bora-ali-3c639',
  storageBucket: 'bora-ali-3c639.appspot.com',
  messagingSenderId: '762833423080',
  appId: '1:762833423080:web:2276ead8588701fd16975d',
  measurementId: 'G-85DQXJ0RMR',
}

const app = initializeApp(firebaseConfig)
getAnalytics(app)

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Routes />
    </ChakraProvider>
  )
}

export default App
