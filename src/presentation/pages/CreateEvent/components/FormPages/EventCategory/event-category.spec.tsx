import { describe, expect, test } from 'vitest'

import { RemoteFetchCategorySpy } from '@/presentation/test'
import { render, screen, waitFor } from '@testing-library/react'

import { EventCategory } from '.'

type SutTypes = {
  fetchCategory: RemoteFetchCategorySpy
}

const makeSut = (): SutTypes => {
  const fetchCategory = new RemoteFetchCategorySpy()
  render(<EventCategory fetchCategory={fetchCategory} />)

  return {
    fetchCategory,
  }
}

describe('<EventCategoryPage />', () => {
  test('should load with all elements', async () => {
    const { fetchCategory } = makeSut()

    expect(screen.getByTestId('event-category-title')).toBeInTheDocument()

    await waitFor(async () => {
      expect(fetchCategory.callsCount).toBe(1)
      expect(screen.getByTestId('event-categories').childElementCount).toBeTruthy()
    })
  })
})
