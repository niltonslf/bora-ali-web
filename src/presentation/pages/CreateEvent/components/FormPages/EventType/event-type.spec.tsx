import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { EventType } from '.'
import { CreateEventProvider } from '../../../context/create-event-context'

const makeSut = () => {
  render(<EventType />, { wrapper: CreateEventProvider })
}

describe('<EventTypePage />', () => {
  test('<should load first page of event creation>', () => {
    makeSut()
    expect(screen.getByTestId('event-type-title')).toBeInTheDocument()
  })

  test('should show event types', () => {
    makeSut()
    expect(screen.getByTestId('event-types').childElementCount).toBeTruthy()
  })
})
