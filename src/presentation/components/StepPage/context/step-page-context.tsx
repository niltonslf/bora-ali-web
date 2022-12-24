import React, { createContext, useState } from 'react'

type StepPageProps = {
  itemActive: number
  setItemActive: React.Dispatch<React.SetStateAction<number>>
  itemsCount: number
  setItemsCount: React.Dispatch<React.SetStateAction<number>>
  percentageCompleted: number
}

export const StepPageContext = createContext<StepPageProps | null>(null)
StepPageContext.displayName = 'StepPageContext'

export const StepPageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [itemActive, setItemActive] = useState(0)
  const [itemsCount, setItemsCount] = useState(0)

  const percentageCompleted = (100 / itemsCount) * (itemActive + 1)

  return (
    <StepPageContext.Provider
      value={{
        itemActive,
        setItemActive,
        itemsCount,
        setItemsCount,
        percentageCompleted,
      }}
    >
      {children}
    </StepPageContext.Provider>
  )
}

export const withStepProvider =
  <T,>(Component: React.ComponentType<T>) =>
  (props: React.PropsWithChildren<T>) => {
    return (
      <StepPageProvider>
        <Component {...props} />
      </StepPageProvider>
    )
  }
