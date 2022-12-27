import { describe, expect, test } from 'vitest'

import { fireEvent, render, screen } from '@testing-library/react'

import { EventPrice } from '.'
import { CreateEventProvider } from '../../../context/create-event-context'

const makeSut = () => {
  render(<EventPrice />, { wrapper: CreateEventProvider })
}

describe('<EventPrice />', () => {
  test('should load with all elements', () => {
    makeSut()
    expect(screen.getByTestId('event-price-title')).toBeInTheDocument()
    expect(screen.getByTestId('event-prices').childElementCount).toBe(2)
  })

  test('should show price detail on select paid event', () => {
    makeSut()
    const options = screen.getByTestId('event-prices').children

    fireEvent.click(options[1])

    expect(screen.getByTestId('event-price-value-title')).toBeInTheDocument()
    expect(screen.getByTestId('event-price-input')).toBeInTheDocument()
  })
})
