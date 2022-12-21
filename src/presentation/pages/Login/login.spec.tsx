import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import { mockAuthenticationResponse } from '@/domain/test/mock-authentication'
import { Authentication, AuthenticationResponse } from '@/domain/usecases'
import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { fireEvent, render, screen } from '@testing-library/react'

import { Login } from '.'

type SutTypes = {
  history: MemoryHistory
}

class FirebaseAuthenticationSpy implements Authentication {
  async auth(): Promise<AuthenticationResponse> {
    return mockAuthenticationResponse
  }
}

const makeSut = (): SutTypes => {
  const authentication = new FirebaseAuthenticationSpy()

  const history = createMemoryHistory()
  render(
    <Router location={history.location} navigator={history}>
      <Login authentication={authentication} />
    </Router>,
    { wrapper: ThemeWrapper }
  )

  return {
    history,
  }
}

describe('Login', () => {
  test('should render Login with google button in it ', () => {
    makeSut()

    const googleButton = screen.getByTestId('google-button')
    expect(googleButton).toBeInTheDocument()
  })

  test('should redirect when clicked at Google auth button ', async () => {
    const { history } = makeSut()

    const googleButton = screen.getByTestId('google-button')
    await fireEvent.click(googleButton)

    expect(history.location.pathname).toBe('/')
  })
})
