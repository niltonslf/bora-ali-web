import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

import {
  FetchEventSpy,
  RemoteCreateEventSpy,
  RemoteFetchCategorySpy,
  RemoteFetchMusicStyleSpy,
  RemoteFetchPlaceTypeSpy,
} from '@/presentation/test'
import { render, screen, waitFor } from '@testing-library/react'

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
  const fetchEvent = new FetchEventSpy()

  render(
    <Router location={history.location} navigator={history}>
      <CreateEvent
        createEvent={remoteCreateEventSpy}
        fetchCategory={fetchCategory}
        fetchMusicStyle={fetchMusicStyle}
        fetchPlaceType={fetchPlaceType}
        fetchEvent={fetchEvent}
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
})
