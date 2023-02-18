import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, test, expect, vi } from 'vitest'

import { FetchEventSpy } from '@/presentation/test'
import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { act, render, screen } from '@testing-library/react'

import { EventMap } from '.'

vi.stubGlobal('location', '')

global.navigator = {
  ...global.navigator,
  geolocation: {
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
    getCurrentPosition: (position) => {
      return position({
        timestamp: 1,
        coords: {
          speed: 1,
          heading: 1,
          accuracy: 1,
          altitudeAccuracy: 1,
          altitude: 1,
          latitude: 1,
          longitude: 1,
        },
      })
    },
  },
}

type SutTypes = {
  fetchEventSpy: FetchEventSpy
  history: MemoryHistory
}

const makeSut = (fetchEventSpy = new FetchEventSpy()): SutTypes => {
  const history = createMemoryHistory()

  render(
    <Router location={history.location} navigator={history}>
      <EventMap fetchEvent={fetchEventSpy} />
    </Router>,
    { wrapper: ThemeWrapper }
  )

  return {
    fetchEventSpy,
    history,
  }
}

describe('EventMap Page', () => {
  test('Should present 6 EventMapSkeleton on start', async () => {
    makeSut()

    const eventMap = screen.getByTestId('event-list')

    expect(eventMap.querySelectorAll("[data-testid='event-skeleton']").length).toBe(6)
    expect(eventMap.querySelectorAll("[data-testid='event-item']").length).toBe(0)

    await act(async () => screen.getByTestId('title'))
  })

  test('should call fetchEvent', async () => {
    const { fetchEventSpy } = makeSut()

    await act(async () => {
      expect(fetchEventSpy.callsCount).toBe(1)
    })
  })

  test('should render EventMap with data with success', async () => {
    makeSut()

    const eventMap = screen.getByTestId('event-list')
    await act(async () => eventMap)

    expect(eventMap.querySelectorAll("[data-testid='event-skeleton']").length).toBe(0)
    expect(screen.queryAllByTestId('event-item')).toHaveLength(2)
  })
})
