import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { describe, test, expect, vi } from 'vitest'

import { UnexpectedError } from '@/data/errors'
import { FetchEventSpy } from '@/presentation/test'
import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { act, render, screen } from '@testing-library/react'

import { EventMap } from '.'

type SutTypes = {
  fetchEventSpy: FetchEventSpy
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
    const eventMap = screen.getByTestId('event-list')
    await act(async () => eventMap)
    expect(fetchEventSpy.callsCount).toBe(1)
  })

  test('should render EventMap with data with success', async () => {
    makeSut()

    const eventMap = screen.getByTestId('event-list')
    await act(async () => eventMap)

    expect(eventMap.querySelectorAll("[data-testid='event-skeleton']").length).toBe(0)
    expect(screen.queryAllByTestId('event-item')).toHaveLength(2)
  })

  test('should render EventMap with error on failure', async () => {
    const fetchEventSpy = new FetchEventSpy()
    const error = new UnexpectedError()

    vi.spyOn(fetchEventSpy, 'fetchAll').mockRejectedValue(error)
    makeSut(fetchEventSpy)

    await act(async () => screen.getByTestId('title'))

    expect(screen.queryByTestId('event-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })
})
