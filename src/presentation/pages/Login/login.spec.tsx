import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { render, screen } from '@testing-library/react'

import { Login } from '.'

const history = createMemoryHistory()

describe('Login', () => {
  test('should render Login ', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Login />
      </Router>,
      {
        wrapper: ThemeWrapper,
      }
    )
    const googleButton = screen.getByTestId('google-button')

    expect(googleButton).toBeInTheDocument()
  })
})
