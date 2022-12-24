import React, { ReactElement, useEffect } from 'react'

import { Flex } from '@chakra-ui/react'

import { useStepPage } from './hook/useStepPage'
import { ProgressBar } from './ProgressBar'

type StepContainerProps = {
  children: ReactElement[]
}

export const StepContainer: React.FC<StepContainerProps> = ({ children }) => {
  const { itemActive, percentageCompleted, setItemsCount } = useStepPage()

  useEffect(() => {
    setItemsCount(children.length)
  }, [])

  return (
    <Flex width='100%' height='100%' flexDirection='column'>
      {children[itemActive || 0]}
      <ProgressBar value={percentageCompleted || 0} />
    </Flex>
  )
}

StepContainer.displayName = 'StepContainer'
