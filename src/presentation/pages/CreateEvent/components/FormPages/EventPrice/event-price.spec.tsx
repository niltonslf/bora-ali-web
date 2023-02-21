import { describe, expect, test, vi } from 'vitest'

import { fireEvent, render, screen } from '@testing-library/react'

import { EventPrice } from '.'

vi.mock('react-text-mask', () => ({
  default: ({ value, onChange, id, autoFocus = false }: any) => (
    <input
      id={id}
      type='text'
      name='event-price-input'
      data-testid='event-price-input'
      value={value}
      onChange={(event) => onChange(event)}
    />
  ),
}))

vi.mock('text-mask-addons/dist/createNumberMask', () => {
  return {
    default: () => 'mock',
  }
})

const makeSut = () => {
  render(<EventPrice />)
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
