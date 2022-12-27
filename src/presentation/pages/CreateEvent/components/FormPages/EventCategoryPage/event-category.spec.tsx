import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { EventCategoryPage } from '.'
import { CreateEventProvider } from '../../../context/create-event-context'

const makeSut = () => {
  render(<EventCategoryPage />, { wrapper: CreateEventProvider })
}

describe('<EventCategoryPage />', () => {
  test('should load with all elements', () => {
    makeSut()
    expect(screen.getByTestId('event-category-title')).toBeInTheDocument()
    expect(screen.getByTestId('event-categories').childElementCount).toBeTruthy()
  })
})
