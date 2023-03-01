import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, test, expect, vi } from 'vitest'

import { mockAccountModel } from '@/domain/test'
import { ApiAccountResponse } from '@/main/adapters/current-account-adapter'
import { AuthContext } from '@/presentation/context'
import { FetchEventSpy, RemotePersistEventSpy } from '@/presentation/test'
import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Profile } from '.'

type SutTypes = {
  history: MemoryHistory
  fetchEvent: FetchEventSpy
  persistEvent: RemotePersistEventSpy
  accountModelMock: ApiAccountResponse
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory()
  const fetchEvent = new FetchEventSpy()
  const persistEvent = new RemotePersistEventSpy()

  const accountModelMock = { ...mockAccountModel(), accessToken: faker.datatype.uuid() }
  const getCurrentAccountSpy = () => accountModelMock

  render(
    <Router location={history.location} navigator={history}>
      <AuthContext.Provider
        value={{
          getCurrentAccount: vi.fn(() => getCurrentAccountSpy()),
          setCurrentAccount: vi.fn(),
        }}
      >
        <Profile fetchEvent={fetchEvent} persistEvent={persistEvent} />
      </AuthContext.Provider>
    </Router>,
    { wrapper: ThemeWrapper }
  )

  return { history, fetchEvent, accountModelMock, persistEvent }
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

  test('Should show profile data', async () => {
    const { accountModelMock } = makeSut()

    await waitFor(async () => screen.getByTestId('page-header'))

    const avatar = screen.getByTestId('user-avatar')
    const userName = screen.getByTestId('user-name')
    const userEmail = screen.getByTestId('user-email')

    expect(avatar.textContent).not.toBe('') // just test with there's some name initials
    expect(userName.textContent).toBe(accountModelMock.name)
    expect(userEmail.textContent).toBe(accountModelMock.email)
  })
})
