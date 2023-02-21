import { observer } from 'mobx-react-lite'
import React, { ReactElement, useEffect, useState } from 'react'

import { Footer } from '@/presentation/pages/CreateEvent/components'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
import { Flex } from '@chakra-ui/react'

import { ProgressBar } from './ProgressBar'

type StepContainerProps = {
  children: ReactElement[]
  index: number
  isFirst?: (value: boolean) => void
  isLast?: (value: boolean) => void
  onSubmit: () => void
  isLoading: boolean
}

export const StepContainer: React.FC<StepContainerProps> = observer(
  ({ children, index, isFirst = () => null, isLast = () => null, onSubmit, isLoading }) => {
    const [itemActive, setItemActive] = useState(0)
    const [itemsCount, setItemsCount] = useState(0)
    const percentageCompleted = (100 / itemsCount) * (itemActive + 1)

    useEffect(() => {
      setItemsCount(children.length)
    }, [])

    useEffect(() => {
      setItemActive(index)

      createEvent.setIsFirst(index === 0)
      createEvent.setIsLast(index === itemsCount - 1)
    }, [index])

    return (
      <Flex width='100%' height='100%' flex='1' flexDirection='column'>
        <Flex height='calc(100vh - 163px)' overflow='auto' flexDirection='column'>
          {children[itemActive]}
        </Flex>
        <ProgressBar value={percentageCompleted || 0} />
        <Footer onSubmit={onSubmit} isLoading={isLoading} />
      </Flex>
    )
  }
)

StepContainer.displayName = 'StepContainer'
