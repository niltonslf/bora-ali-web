import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

import { RemoteCreateEventSpy } from '@/presentation/test'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CreateEvent } from '.'

global.URL.createObjectURL = vi.fn(() => '')

type SutTypes = {
  history: MemoryHistory
  remoteCreateEventSpy: RemoteCreateEventSpy
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory()
  const remoteCreateEventSpy = new RemoteCreateEventSpy()

  render(
    <Router location={history.location} navigator={history}>
      <CreateEvent createEvent={remoteCreateEventSpy} />
    </Router>
  )

  return {
    history,
    remoteCreateEventSpy,
  }
}

describe('<CreateEvent/>', () => {
  test('<should load first page of event creation>', () => {
    makeSut()
    expect(screen.getByTestId('event-type-title')).toBeInTheDocument()
    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })

  test('should skip to the next page', () => {
    makeSut()
    const nextButton = screen.getByTestId('next-button')
    expect(nextButton).toBeInTheDocument()
    fireEvent.click(nextButton)
    expect(screen.getByTestId('event-category-title')).toBeInTheDocument()
  })

  test('should call CreateEvent with correct values', async () => {
    const { remoteCreateEventSpy } = makeSut()

    const nextButton = screen.getByTestId('next-button')

    expect(nextButton).toBeInTheDocument()

    const eventTypes = screen.getByTestId('event-types')
    fireEvent.click(eventTypes.children[0])
    fireEvent.click(nextButton)

    const eventCategories = screen.getByTestId('event-categories')
    fireEvent.click(eventCategories.children[0])
    fireEvent.click(nextButton)

    const eventMusicalStyles = screen.getByTestId('event-musical-styles')
    fireEvent.click(eventMusicalStyles.children[0])
    fireEvent.click(nextButton)

    const eventHasMeal = screen.getByTestId('event-has-meal')
    fireEvent.click(eventHasMeal.children[0])
    fireEvent.click(nextButton)

    const eventPrices = screen.getByTestId('event-prices')
    fireEvent.click(eventPrices.children[0])
    fireEvent.click(nextButton)

    const eventAddress = screen.getByTestId('event-location-input')
    fireEvent.input(eventAddress, { target: { value: 'address' } })
    fireEvent.click(nextButton)

    const eventDescription = screen.getByTestId('event-description-input')
    fireEvent.input(eventDescription, { target: { value: 'description' } })
    fireEvent.click(nextButton)

    const eventPicture = screen.getByTestId<HTMLInputElement>('file-input')
    const testImageFile = new File(['hello'], 'hello.png', { type: 'image/png' })
    await userEvent.upload(eventPicture, testImageFile)

    fireEvent.click(nextButton)

    const eventName = screen.getByTestId('event-name-input')
    fireEvent.input(eventName, { target: { value: 'event name' } })

    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)

    const object: any = {}

    remoteCreateEventSpy.event.forEach((value, key) => (object[key] = value))

    expect(remoteCreateEventSpy.event.get('address')).toBeTruthy()
    expect(remoteCreateEventSpy.event.get('categories')).toBeTruthy()
    expect(remoteCreateEventSpy.event.get('description')).toBeTruthy()
    expect(remoteCreateEventSpy.event.get('hasMeal')).toBeTruthy()
    expect(remoteCreateEventSpy.event.get('images')).toBeTruthy()
    expect(remoteCreateEventSpy.event.get('musicStyleId')).toBeTruthy()
    expect(remoteCreateEventSpy.event.get('name')).toBeTruthy()
    expect(remoteCreateEventSpy.event.get('placeTypeId')).toBeTruthy()
    expect(remoteCreateEventSpy.event.get('price')).toBeTruthy()
    // expect(remoteCreateEventSpy.event.get('lat')).toBeTruthy()
    // expect(remoteCreateEventSpy.event.get('lng')).toBeTruthy()
  })
})
