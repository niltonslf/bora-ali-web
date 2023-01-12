import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

import {
  RemoteCreateEventSpy,
  RemoteFetchCategorySpy,
  RemoteFetchMusicStyleSpy,
  RemoteFetchPlaceTypeSpy,
} from '@/presentation/test'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CreateEvent } from '.'

global.URL.createObjectURL = vi.fn(() => '')

type SutTypes = {
  history: MemoryHistory
  remoteCreateEventSpy: RemoteCreateEventSpy
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory()
  const remoteCreateEventSpy = new RemoteCreateEventSpy()
  const fetchCategory = new RemoteFetchCategorySpy()
  const fetchMusicStyle = new RemoteFetchMusicStyleSpy()
  const fetchPlaceType = new RemoteFetchPlaceTypeSpy()

  render(
    <Router location={history.location} navigator={history}>
      <CreateEvent
        createEvent={remoteCreateEventSpy}
        fetchCategory={fetchCategory}
        fetchMusicStyle={fetchMusicStyle}
        fetchPlaceType={fetchPlaceType}
      />
    </Router>
  )

  return {
    history,
    remoteCreateEventSpy,
  }
}

describe('<CreateEvent/>', () => {
  test('should load first page of event creation', async () => {
    makeSut()
    const eventTitle = screen.getByTestId('event-type-title')

    await waitFor(async () => eventTitle)

    expect(eventTitle).toBeInTheDocument()
    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })

  test('should skip to the next page', async () => {
    makeSut()
    const nextButton = screen.getByTestId('next-button')
    const eventTitle = screen.getByTestId('event-type-title')

    expect(eventTitle).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()

    await waitFor(async () => {
      const eventTypes = screen.getByTestId('event-types')
      await userEvent.click(eventTypes.children[0])
      await userEvent.click(nextButton)

      expect(screen.getByTestId('event-category-title')).toBeInTheDocument()
    })
  })
})
