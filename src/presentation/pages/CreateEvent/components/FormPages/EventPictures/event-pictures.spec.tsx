import { describe, expect, test, vi } from 'vitest'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { EventPictures } from '.'

global.URL.createObjectURL = vi.fn(() => '')

const makeSut = () => {
  render(<EventPictures />)
}

describe('<EventPictures />', () => {
  test('should load with all elements', () => {
    makeSut()
    expect(screen.getByTestId('event-pictures-title')).toBeInTheDocument()
    expect(screen.getByTestId('file-box')).toBeInTheDocument()
  })

  test('should show image previews', async () => {
    makeSut()

    const fileInput = screen.getByTestId<HTMLInputElement>('file-input')

    const testImageFile = new File(['hello'], 'hello.png', { type: 'image/png' })

    // empty input
    expect(fileInput?.files?.length).toBe(0)

    await userEvent.upload(fileInput, testImageFile)

    expect(fileInput?.files?.length).toBe(1)
    expect(screen.getByTestId('pictures-preview')).toBeInTheDocument()
    expect(screen.getByTestId('reset-button')).toBeInTheDocument()
  })

  test('should reset files', async () => {
    makeSut()

    const fileInput = screen.getByTestId<HTMLInputElement>('file-input')
    const testImageFile = new File(['hello'], 'hello.png', { type: 'image/png' })

    // empty input
    expect(fileInput?.files?.length).toBe(0)
    // add a file
    await userEvent.upload(fileInput, testImageFile)

    expect(fileInput?.files?.length).toBe(1)
    expect(screen.getByTestId('pictures-preview')).toBeInTheDocument()

    const resetButton = screen.getByTestId('reset-button')
    expect(resetButton).toBeInTheDocument()

    await userEvent.click(resetButton)

    expect(screen.queryByTestId('pictures-preview')).not.toBeInTheDocument()
  })
})
