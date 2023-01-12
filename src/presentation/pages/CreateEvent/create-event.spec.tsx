import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

import {
  RemoteCreateEventSpy,
  RemoteFetchCategorySpy,
  RemoteFetchMusicStyleSpy,
  RemoteFetchPlaceTypeSpy,
} from '@/presentation/test'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
  const fetchCategory = new RemoteFetchCategorySpy()
  const fetchMusicStyle = new RemoteFetchMusicStyleSpy()
  const fetchPlaceType = new RemoteFetchPlaceTypeSpy()

  render(
    <Router location={history.location} navigator={history}>
      <CreateEvent
        createEvent={remoteCreateEventSpy}
        fetchCategory={fetchCategory}
        fetchMusicStyle={fetchMusicStyle}
        fetchPlaceType={fetchPlaceType}
      />
    </Router>
  )

  return {
    history,
    remoteCreateEventSpy,
  }
}

describe('<CreateEvent/>', () => {
  test('should load first page of event creation', async () => {
    makeSut()
    const eventTitle = screen.getByTestId('event-type-title')

    await waitFor(async () => eventTitle)

    expect(eventTitle).toBeInTheDocument()
    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })

  test('should skip to the next page', async () => {
    makeSut()
    const nextButton = screen.getByTestId('next-button')
    const eventTitle = screen.getByTestId('event-type-title')

    expect(eventTitle).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()

    await waitFor(async () => {
      const eventTypes = screen.getByTestId('event-types')
      await userEvent.click(eventTypes.children[0])
      await userEvent.click(nextButton)

      expect(screen.getByTestId('event-category-title')).toBeInTheDocument()
    })
  })

  test.skip('should call CreateEvent with correct values', async () => {
    const { remoteCreateEventSpy } = makeSut()

    const nextButton = screen.getByTestId('next-button')

    expect(nextButton).toBeInTheDocument()

    await waitFor(async () => {
      const eventTypes = screen.getByTestId('event-types')

      await userEvent.click(eventTypes.children[0])
      await userEvent.click(nextButton)

      const eventCategories = screen.getByTestId('event-categories')
      await userEvent.click(eventCategories.children[0])
      await userEvent.click(nextButton)

      const eventMusicalStyles = screen.getByTestId('event-musical-styles')
      await userEvent.click(eventMusicalStyles.children[0])
      await userEvent.click(nextButton)

      const eventHasMeal = screen.getByTestId('event-has-meal')
      await userEvent.click(eventHasMeal.children[0])
      await userEvent.click(nextButton)

      const eventPrices = screen.getByTestId('event-prices')
      await userEvent.click(eventPrices.children[0])
      await userEvent.click(nextButton)

      const eventAddress = screen.getByTestId('event-location-input')
      const eventLat = screen.getByTestId('event-lat-input')
      const eventLng = screen.getByTestId('event-lng-input')
      await userEvent.type(eventAddress, 'address')
      await userEvent.type(eventLat, '0')
      await userEvent.type(eventLng, '0')
      await userEvent.click(nextButton)

      const eventDescription = screen.getByTestId('event-description-input')
      fireEvent.input(eventDescription, { target: { value: 'description' } })
      await userEvent.click(nextButton)

      const eventPicture = screen.getByTestId<HTMLInputElement>('file-input')
      const testImageFile = new File(['hello'], 'hello.png', { type: 'image/png' })
      await userEvent.upload(eventPicture, testImageFile)
      await userEvent.click(nextButton)

      const startDate = screen.getByTestId('event-start-input')
      const endDate = screen.getByTestId('event-end-input')
      fireEvent.input(startDate, { target: { value: '2023-12-12T00:00' } })
      fireEvent.input(endDate, { target: { value: '2023-12-12T00:00' } })
      await userEvent.click(nextButton)

      const eventName = screen.getByTestId('event-name-input')
      fireEvent.input(eventName, { target: { value: 'event name' } })

      const submitButton = screen.getByTestId('submit-button')
      await userEvent.click(submitButton)

      const object: any = {}

      remoteCreateEventSpy.event.forEach((value, key) => (object[key] = value))

      expect(remoteCreateEventSpy.event.get('categories')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('description')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('hasMeal')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('images')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('musicStyleId')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('name')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('placeTypeId')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('price')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('address')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('lat')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('lng')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('startDate')).toBeTruthy()
      expect(remoteCreateEventSpy.event.get('endDate')).toBeTruthy()
    })
  })
})
