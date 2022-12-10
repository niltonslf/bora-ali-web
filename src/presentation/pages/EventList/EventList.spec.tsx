import React from 'react'
import { describe, test, expect } from 'vitest'

import { theme } from '@/presentation/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'

import { EventList } from '.'

export const ThemeWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

const makeSut = () => {
  render(<EventList />, { wrapper: ThemeWrapper })
}

describe('EventList Page', () => {
  test('Should present 6 EventListSkeleton on start', () => {
    makeSut()

    const eventList = screen.getByTestId('event-list')

    expect(eventList.querySelectorAll("[data-testid='event-skeleton']").length).toBe(6)
    expect(eventList.querySelectorAll("[data-testid='event-item']").length).toBe(0)
  })
})
