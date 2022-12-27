import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { EventMusicalStyle } from '.'
import { CreateEventProvider } from '../../../context/create-event-context'

const makeSut = () => {
  render(<EventMusicalStyle />, { wrapper: CreateEventProvider })
}

describe('<EventMusicalStyle />', () => {
  test('should load with all elements', () => {
    makeSut()
    expect(screen.getByTestId('event-musical-style-title')).toBeInTheDocument()
    expect(screen.getByTestId('event-musical-styles').childElementCount).toBeTruthy()
  })
})
