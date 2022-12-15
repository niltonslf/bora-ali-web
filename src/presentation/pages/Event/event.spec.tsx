import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { Event } from '.'

describe('Event page', () => {
  test('should render Event page with all sections', () => {
    render(<Event />)

    const title = screen.getByTestId('title-section')
    const gallery = screen.getByTestId('gallery-section')
    const description = screen.getByTestId('description-section')
    const options = screen.getByTestId('options-section')
    const map = screen.getByTestId('map-section')

    expect(title).toBeInTheDocument()
    expect(gallery).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(options).toBeInTheDocument()
    expect(map).toBeInTheDocument()
  })
})
