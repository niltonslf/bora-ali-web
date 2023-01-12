import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { EventDates } from '.'
import { CreateEventProvider } from '../../../context/create-event-context'

const makeSut = () => {
  render(<EventDates />, { wrapper: CreateEventProvider })
}

describe('<EventDates />', () => {
  test('should load with all elements', () => {
    makeSut()
    expect(screen.getByTestId('event-dates-title')).toBeInTheDocument()
    expect(screen.getByTestId('event-start-input')).toHaveTextContent('')
    expect(screen.getByTestId('event-end-input')).toHaveTextContent('')
  })
})
