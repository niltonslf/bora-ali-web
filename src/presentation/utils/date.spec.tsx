import { describe, expect, test } from 'vitest'

import { formatDateFromBrToDb, formatDateToReadable, formatTimeToReadable } from './date'

describe('dates utils', () => {
  test('formatDateFromBrToDb', () => {
    const initialValue = '23/04/2023'

    expect(formatDateFromBrToDb(initialValue)).toBe('2023-04-23')
  })

  test('formatDateToReadable', () => {
    const initialValue = '2023-04-23T00:00:00Z'

    expect(formatDateToReadable(initialValue)).toBe('23/04/2023')
  })

  test('formatTimeToReadable', () => {
    const initialValue = '18:20:03'

    expect(formatTimeToReadable(initialValue)).toBe('18:20')
  })
})
