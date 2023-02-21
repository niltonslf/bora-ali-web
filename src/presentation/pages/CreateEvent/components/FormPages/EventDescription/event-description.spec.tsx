import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { EventDescription } from '.'

const makeSut = () => {
  render(<EventDescription />)
}

describe('<EventDescription />', () => {
  test('should load with all elements', () => {
    makeSut()
    expect(screen.getByTestId('event-description-title')).toBeInTheDocument()
    expect(screen.getByTestId('event-description-input').textContent).toBe('')
  })
})
