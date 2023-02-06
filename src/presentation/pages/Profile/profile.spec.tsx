import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, test, expect, vi } from 'vitest'

// import { HttpResponse, HttpStatusCode } from '@/data/protocols/http'
// import { mockEventModel } from '@/domain/test'
import { mockAccountModel } from '@/domain/test'
import { AuthContext } from '@/presentation/context'
import { FetchEventSpy } from '@/presentation/test'
import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Profile } from '.'

type SutTypes = {
  history: MemoryHistory
  fetchEvent: FetchEventSpy
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory()
  const fetchEvent = new FetchEventSpy()

  render(
    <Router location={history.location} navigator={history}>
      <AuthContext.Provider
        value={{
          getCurrentAccount: vi.fn(() => ({
            ...mockAccountModel(),
            accessToken: faker.datatype.uuid(),
          })),
          setCurrentAccount: vi.fn(),
        }}
      >
        <Profile fetchEvent={fetchEvent} />
      </AuthContext.Provider>
    </Router>,
    { wrapper: ThemeWrapper }
  )

  return { history, fetchEvent }
}

describe('<Profile>', () => {
  test('Render page with all components', async () => {
    makeSut()

    await waitFor(async () => screen.getByTestId('page-header'))

    const header = screen.getByTestId('page-header')
    const avatar = screen.getByTestId('user-avatar')
    const userName = screen.getByTestId('user-name')
    const userEmail = screen.getByTestId('user-email')
    const createEventBtn = screen.getByTestId('create-event-btn')

    expect(header).toBeInTheDocument()
    expect(avatar).toBeInTheDocument()
    expect(userName).toBeInTheDocument()
    expect(userEmail).toBeInTheDocument()
    expect(createEventBtn).toBeInTheDocument()
  })

  test('Should redirect to create event page', async () => {
    const { history } = makeSut()

    await waitFor(async () => screen.getByTestId('page-header'))

    const createEventBtn = screen.getByTestId('create-event-btn')

    fireEvent.click(createEventBtn)

    expect(history.location.pathname).toBe('/create-event')
  })

  test('Should fetch user events', async () => {
    makeSut()

    await waitFor(async () => screen.getByTestId('page-header'))

    const eventList = screen.getByTestId('event-list')

    expect(eventList.childElementCount).toBe(2)
  })
})
