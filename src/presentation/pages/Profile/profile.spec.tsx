import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, test, expect } from 'vitest'

import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { fireEvent, render, screen } from '@testing-library/react'

import { Profile } from '.'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory()

  render(
    <Router location={history.location} navigator={history}>
      <Profile />
    </Router>,
    { wrapper: ThemeWrapper }
  )

  return { history }
}

describe('<Profile>', () => {
  test('Render page with all components', () => {
    makeSut()

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

    const createEventBtn = screen.getByTestId('create-event-btn')

    fireEvent.click(createEventBtn)

    expect(history.location.pathname).toBe('/create-event')
  })
})
