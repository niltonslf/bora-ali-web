import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { config } from './config'
import { fonts } from './fonts'
import { textStyles } from './textStyles'

export const theme = extendTheme({
  config,
  colors,
  fonts,
  textStyles,
})
