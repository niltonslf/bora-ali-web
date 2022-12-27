import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { EventPictures } from '.'
import { CreateEventProvider } from '../../../context/create-event-context'

const makeSut = () => {
  render(<EventPictures />, { wrapper: CreateEventProvider })
}

describe('<EventPictures />', () => {
  test('should load with all elements', () => {
    makeSut()
    expect(screen.getByTestId('event-pictures-title')).toBeInTheDocument()
    expect(screen.getByTestId('file-box')).toBeInTheDocument()
  })
})
