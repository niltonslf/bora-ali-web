import { describe, expect, test } from 'vitest'

import { RemoteFetchMusicStyleSpy } from '@/presentation/test'
import { render, screen, waitFor } from '@testing-library/react'

import { EventMusicalStyle } from '.'
import { CreateEventProvider } from '../../../context/create-event-context'

type SutTypes = {
  fetchMusicStyle: RemoteFetchMusicStyleSpy
}

const makeSut = (): SutTypes => {
  const fetchMusicStyle = new RemoteFetchMusicStyleSpy()
  render(<EventMusicalStyle fetchMusicStyle={fetchMusicStyle} />, { wrapper: CreateEventProvider })

  return { fetchMusicStyle }
}

describe('<EventMusicalStyle />', () => {
  test('should load with all elements', async () => {
    const { fetchMusicStyle } = makeSut()
    expect(screen.getByTestId('event-musical-style-title')).toBeInTheDocument()

    await waitFor(async () => {
      expect(fetchMusicStyle.callsCount).toBe(1)
      expect(screen.getByTestId('event-musical-styles').childElementCount).toBe(3)
    })
  })
})
