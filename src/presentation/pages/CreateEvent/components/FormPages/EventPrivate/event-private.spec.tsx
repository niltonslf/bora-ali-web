import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { EventPrivate } from '.'

const makeSut = () => {
  render(<EventPrivate />)
}

describe('<EventPrivate />', () => {
  test('should load with all elements', () => {
    makeSut()
    expect(screen.getByTestId('event-private-title')).toBeInTheDocument()
    expect(screen.getByTestId('event-private').childElementCount).toBe(2)
  })
})
