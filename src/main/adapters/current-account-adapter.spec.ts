import { describe, expect, test, vi } from 'vitest'

import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { faker } from '@faker-js/faker'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from './current-account-adapter'

vi.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  describe('setCurrentAccountAdapter', () => {
    test('should call LocalStorageAdapter.set with correct values', () => {
      const account = mockAccountModel()
      const accessToken = faker.datatype.uuid()
      const setSpy = vi.spyOn(LocalStorageAdapter.prototype, 'set')

      setCurrentAccountAdapter(account, accessToken)

      expect(setSpy).toHaveBeenCalledWith('account', { ...account, accessToken })
    })
  })

  describe('getCurrentAccountAdapter', () => {
    test('should call LocalStorageAdapter.get with correct value', () => {
      const account = mockAccountModel()
      const getSpy = vi.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValue(account)

      const result = getCurrentAccountAdapter()

      expect(getSpy).toHaveBeenCalledWith('account')
      expect(result).toBe(account)
    })
  })
})
