import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { AuthContext } from '@/presentation/context'
import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { fireEvent, render, screen } from '@testing-library/react'

import { Header } from '.'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel, accessToken: string) => void
  getCurrentAccountMock: () => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = vi.fn()
  const getCurrentAccountMock = () => ({ ...account, accessToken: '' })

  const history = createMemoryHistory()
  render(
    <AuthContext.Provider
      value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: getCurrentAccountMock }}
    >
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    </AuthContext.Provider>,
    { wrapper: ThemeWrapper }
  )

  return {
    history,
    setCurrentAccountMock,
    getCurrentAccountMock,
  }
}

describe('<Header />', () => {
  test('should call setCurrentAccountMock with null', () => {
    const { setCurrentAccountMock, history } = makeSut()

    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith()
    expect(history.location.pathname).toBe('/auth')
  })

  test('should show username correctly', async () => {
    const account = mockAccountModel()
    makeSut(account)

    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
