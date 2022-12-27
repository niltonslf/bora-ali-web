import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { EventName } from '.'
import { CreateEventProvider } from '../../../context/create-event-context'

const makeSut = () => {
  render(<EventName />, { wrapper: CreateEventProvider })
}

describe('<EventName />', () => {
  test('should load with all elements', () => {
    makeSut()
    expect(screen.getByTestId('event-name-title')).toBeInTheDocument()
    expect(screen.getByTestId('event-name-input')).toHaveTextContent('')
  })
})
