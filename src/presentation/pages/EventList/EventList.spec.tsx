import React from 'react'
import { describe, test, expect } from 'vitest'

import { EventModel } from '@/domain/models'
import { mockEventListModel } from '@/domain/test/mock-fetch-event'
import { FetchEvent } from '@/domain/usecases'
import { theme } from '@/presentation/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { act, render, screen } from '@testing-library/react'

import { EventList } from '.'

export const ThemeWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

class FetchEventSpy implements FetchEvent {
  callsCount: number = 0

  async fetchAll(): Promise<EventModel[]> {
    this.callsCount++
    return mockEventListModel()
  }
}

type SutTypes = {
  fetchEventSpy: FetchEventSpy
}

const makeSut = (): SutTypes => {
  const fetchEventSpy = new FetchEventSpy()

  render(<EventList fetchEvent={fetchEventSpy} />, { wrapper: ThemeWrapper })

  return {
    fetchEventSpy,
  }
}

describe('EventList Page', () => {
  test('Should present 6 EventListSkeleton on start', () => {
    makeSut()

    const eventList = screen.getByTestId('event-list')

    expect(eventList.querySelectorAll("[data-testid='event-skeleton']").length).toBe(6)
    expect(eventList.querySelectorAll("[data-testid='event-item']").length).toBe(0)
  })

  test('should call fetchEvent', async () => {
    const { fetchEventSpy } = makeSut()
    const eventList = screen.getByTestId('event-list')
    await act(async () => eventList)
    expect(fetchEventSpy.callsCount).toBe(1)
  })

  test('should render EventList with data', async () => {
    makeSut()

    const eventList = screen.getByTestId('event-list')
    await act(async () => eventList)

    expect(eventList.querySelectorAll("[data-testid='event-skeleton']").length).toBe(0)
    expect(screen.queryAllByTestId('event-item')).toHaveLength(2)
  })
})
