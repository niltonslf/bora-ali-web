import { describe, expect, test } from 'vitest'

import { RemoteFetchPlaceTypeSpy } from '@/presentation/test'
import { render, screen, waitFor } from '@testing-library/react'

import { EventType } from '.'
import { CreateEventProvider } from '../../../context/create-event-context'

type SutTypes = {
  fetchPlaceType: RemoteFetchPlaceTypeSpy
}

const makeSut = (): SutTypes => {
  const fetchPlaceType = new RemoteFetchPlaceTypeSpy()
  render(<EventType fetchPlaceType={fetchPlaceType} />, { wrapper: CreateEventProvider })

  return {
    fetchPlaceType,
  }
}

describe('<EventTypePage />', () => {
  test('should load page with all elements', async () => {
    const { fetchPlaceType } = makeSut()

    expect(screen.getByTestId('event-type-title')).toBeInTheDocument()

    await waitFor(async () => {
      expect(fetchPlaceType.callsCount).toBe(1)
      expect(screen.getByTestId('event-types').childElementCount).toBeTruthy()
    })
  })
})
