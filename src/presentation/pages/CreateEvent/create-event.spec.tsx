import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

import { RemotePersistEventSpy } from '@/presentation/test'
import { render, screen, waitFor } from '@testing-library/react'

import { CreateEvent } from '.'

global.URL.createObjectURL = vi.fn(() => '')

type SutTypes = {
  history: MemoryHistory
  remoteCreateEventSpy: RemotePersistEventSpy
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory()
  const remoteCreateEventSpy = new RemotePersistEventSpy()

  render(
    <Router location={history.location} navigator={history}>
      <CreateEvent createEvent={remoteCreateEventSpy} />
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
    const eventTitle = screen.getByTestId('event-private-title')

    await waitFor(async () => eventTitle)

    expect(eventTitle).toBeInTheDocument()
    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })
})
