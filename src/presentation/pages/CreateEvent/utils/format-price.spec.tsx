import { describe, expect, test } from 'vitest'

import { formatPrice } from './format-price'

describe('format price function', () => {
  test('should format price to insert into database', () => {
    const initialValue = 'R$ 2.500,99'

    expect(formatPrice(initialValue)).toBe('2500.99')
  })
})
