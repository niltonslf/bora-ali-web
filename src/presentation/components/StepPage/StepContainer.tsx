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

    isFirst(index === 0)
    isLast(index === itemsCount - 1)
  }, [index])

  return (
    <Flex width='100%' height='100%' flex='1' flexDirection='column'>
      {children[itemActive || 0]}
      <ProgressBar value={percentageCompleted || 0} />
    </Flex>
  )
}

StepContainer.displayName = 'StepContainer'
