import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { fireEvent, render, screen } from '@testing-library/react'

import { Login } from '.'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory()
  render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>,
    { wrapper: ThemeWrapper }
  )

  return {
    history,
  }
}

describe('Login', () => {
  test('should render Login ', () => {
    makeSut()

    const googleButton = screen.getByTestId('google-button')

    expect(googleButton).toBeInTheDocument()
  })

  test('should redirect when clicked at Google auth button ', () => {
    const { history } = makeSut()

    const googleButton = screen.getByTestId('google-button')
    fireEvent.click(googleButton)

    expect(history.location.pathname).toBe('/')
  })
})
