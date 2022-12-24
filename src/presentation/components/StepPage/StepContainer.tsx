import React, { ReactElement, useEffect, useState } from 'react'

import { Flex } from '@chakra-ui/react'

import { ProgressBar } from './ProgressBar'

type StepContainerProps = {
  children: ReactElement[]
  index: number
  isFirst?: (value: boolean) => void
  isLast?: (value: boolean) => void
}

export const StepContainer: React.FC<StepContainerProps> = ({
  children,
  index,
  isFirst = () => null,
  isLast = () => null,
}) => {
  const [itemActive, setItemActive] = useState(0)
  const [itemsCount, setItemsCount] = useState(0)
  const percentageCompleted = (100 / itemsCount) * (itemActive + 1)

  useEffect(() => {
    setItemsCount(children.length)
  }, [])

  useEffect(() => {
    setItemActive(index)

    if (index === 0) {
      isFirst(true)
      isLast(false)
    }

    if (index === itemsCount - 1) {
      isFirst(false)
      isLast(true)
    }
  }, [index])

  return (
    <Flex width='100%' height='100%' flexDirection='column'>
      {children[itemActive || 0]}
      <ProgressBar value={percentageCompleted || 0} />
    </Flex>
  )
}

StepContainer.displayName = 'StepContainer'
