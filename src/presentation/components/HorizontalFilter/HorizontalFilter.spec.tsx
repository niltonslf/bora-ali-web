import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, test, expect } from 'vitest'

import { mockCategoryListModel, mockMusicStyleListModel } from '@/domain/test'
import { mockPlaceTypeListModel } from '@/domain/test/mock-fetch-place-type'
import { render, screen } from '@testing-library/react'

import { HorizontalFilter } from '.'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const categories = mockCategoryListModel()
  const placesType = mockPlaceTypeListModel()
  const musicStyles = mockMusicStyleListModel()

  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <Router location={history.location} navigator={history}>
      <HorizontalFilter filters={{ categories, placesType, musicStyles }} />
    </Router>
  )

  return { history }
}

describe('<HorizontalFilter />', () => {
  test('should render filter items ', () => {
    makeSut()

    const container = screen.getByTestId('filters-container')

    expect(container.childElementCount).not.toBe(0)
  })
})
