import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, test, expect } from 'vitest'

import { mockCategoryListModel, mockMusicStyleListModel } from '@/domain/test'
import { mockPlaceTypeListModel } from '@/domain/test/mock-fetch-place-type'
import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { fireEvent, render, screen } from '@testing-library/react'

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
    </Router>,
    {
      wrapper: ThemeWrapper,
    }
  )

  return { history }
}

describe('<HorizontalFilter />', () => {
  test('should render filter items ', () => {
    makeSut()

    const container = screen.getByTestId('filters-container')

    expect(container.childElementCount).not.toBe(0)
  })

  test('should append filter to the URL ', async () => {
    const { history } = makeSut()

    const container = screen.getByTestId('filters-container')

    expect(history.location.pathname).toBe('/')

    const filter = container.children[0]
    const filterName = filter.textContent

    await fireEvent.click(filter)

    expect(history.location.search).includes(filterName)
  })
})
