import { Route, Routes, MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import { FetchEventSpy, RemotePresenceAtEventSpy } from '@/presentation/test'
import { render, screen, waitFor } from '@testing-library/react'

import { Event } from '.'

type SutTypes = {
  fetchEvent: FetchEventSpy
}

const makeSut = (): SutTypes => {
  const fetchEvent = new FetchEventSpy()
  const presenceAtEvent = new RemotePresenceAtEventSpy()

  render(
    <MemoryRouter initialEntries={['/event/123/']}>
      <Routes>
        <Route
          path='/event/:eventId'
          element={<Event fetchEvent={fetchEvent} presenceAtEvent={presenceAtEvent} />}
        />
      </Routes>
    </MemoryRouter>
  )

  return {
    fetchEvent,
  }
}

describe('Event page', () => {
  test('should render Event page with all sections', async () => {
    makeSut()

    await waitFor(async () => {
      const title = screen.getByTestId('title-section')
      const gallery = screen.getByTestId('gallery-section')
      const description = screen.getByTestId('description-section')
      const options = screen.getByTestId('options-section')
      const map = screen.getByTestId('map-section')

      expect(title).toBeInTheDocument()
      expect(gallery).toBeInTheDocument()
      expect(description).toBeInTheDocument()
      expect(options).toBeInTheDocument()
      expect(map).toBeInTheDocument()
    })
  })

  test('should call fetchById', async () => {
    const { fetchEvent } = makeSut()

    await waitFor(async () => screen.getByTestId('title-section'))

    expect(fetchEvent.callsCount).toBe(1)
  })
})
