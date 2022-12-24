import { useContext } from 'react'

import { StepPageContext } from '../context/step-page-context'

export const useStepPage = () => {
  const context = useContext(StepPageContext)

  const nextPage = () => {
    // @ts-expect-error
    if (context?.itemActive === context?.itemsCount - 1) return
    context?.setItemActive((prev) => prev + 1)
  }

  const previousPage = () => {
    if (context?.itemActive === 0) return

    context?.setItemActive((prev) => prev - 1)
  }

  const setItemsCount = (value: number) => {
    context?.setItemsCount(value)
  }

  return {
    nextPage,
    previousPage,
    setItemsCount,
    itemActive: context?.itemActive,
    percentageCompleted: context?.percentageCompleted,
  }
}
