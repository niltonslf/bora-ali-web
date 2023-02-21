import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { EventHasMeals } from '.'

const makeSut = () => {
  render(<EventHasMeals />)
}

describe('<EventHasMeals />', () => {
  test('should load with all elements', () => {
    makeSut()
    expect(screen.getByTestId('event-has-meal-title')).toBeInTheDocument()
    expect(screen.getByTestId('event-has-meal').childElementCount).toBe(2)
  })
})
