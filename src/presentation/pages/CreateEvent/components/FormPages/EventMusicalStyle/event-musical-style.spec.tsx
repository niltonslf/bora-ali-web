import { describe, expect, test } from 'vitest'

import { RemoteFetchMusicStyleSpy } from '@/presentation/test'
import { render, screen, waitFor } from '@testing-library/react'

import { EventMusicalStyle } from '.'

type SutTypes = {
  fetchMusicStyle: RemoteFetchMusicStyleSpy
}

const makeSut = (): SutTypes => {
  const fetchMusicStyle = new RemoteFetchMusicStyleSpy()
  render(<EventMusicalStyle fetchMusicStyle={fetchMusicStyle} />)

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
