import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import { fireEvent, render, screen } from '@testing-library/react'

import { CreateEvent } from '.'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory()

  render(
    <Router location={history.location} navigator={history}>
      <CreateEvent />
    </Router>
  )

  return {
    history,
  }
}

describe('<CreateEvent/>', () => {
  describe('<EventTypePage />', () => {
    test('<should load first page of event creation>', () => {
      makeSut()
      expect(screen.getByTestId('event-type-title')).toBeInTheDocument()
      expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
    })

    test('should show event types', () => {
      makeSut()
      expect(screen.getByTestId('event-types').childElementCount).toBeTruthy()
    })

    test('should skip to the next page', () => {
      makeSut()
      const nextButton = screen.getByTestId('next-button')
      expect(nextButton).toBeInTheDocument()
      fireEvent.click(nextButton)
      expect(screen.getByTestId('event-category-title')).toBeInTheDocument()
    })
  })

  describe('<EventCategoryPage />', () => {
    test('should load <EventCategoryPage />', () => {
      makeSut()
      const nextButton = screen.getByTestId('next-button')
      fireEvent.click(nextButton)
      expect(screen.getByTestId('event-category-title')).toBeInTheDocument()
    })
  })
})
