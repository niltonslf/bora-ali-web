import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { Authentication } from '@/domain/usecases'
import { AuthContext } from '@/presentation/context/auth/auth-context'
import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Login } from '.'

class FirebaseAuthenticationSpy implements Authentication {
  account = mockAccountModel()

  async auth(): Promise<AccountModel> {
    return await Promise.resolve(this.account)
  }
}

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
  authenticationSpy: FirebaseAuthenticationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new FirebaseAuthenticationSpy()

  const setCurrentAccountMock = vi.fn()

  const history = createMemoryHistory()
  render(
    <AuthContext.Provider
      value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: vi.fn() }}
    >
      <Router location={history.location} navigator={history}>
        <Login authentication={authenticationSpy} />
      </Router>
    </AuthContext.Provider>,
    { wrapper: ThemeWrapper }
  )

  return {
    history,
    setCurrentAccountMock,
    authenticationSpy,
  }
}

describe('Login', () => {
  test('should render Login with google button in it ', () => {
    makeSut()

    const googleButton = screen.getByTestId('google-button')
    expect(googleButton).toBeInTheDocument()
  })

  test('should redirect when authenticated by Google', async () => {
    const { history } = makeSut()

    const googleButton = screen.getByTestId('google-button')
    await fireEvent.click(googleButton)

    expect(history.location.pathname).toBe('/')
  })

  test('should call SaveLocalAccessToken on success', async () => {
    const { history, setCurrentAccountMock, authenticationSpy } = makeSut()

    const googleButton = screen.getByTestId('google-button')
    await fireEvent.click(googleButton)

    await waitFor(() => screen.getByTestId('title'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.location.pathname).toBe('/')
  })
})
