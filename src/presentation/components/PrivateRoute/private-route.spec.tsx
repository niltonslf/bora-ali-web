import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { expect, describe, test, vi } from 'vitest'

import { mockAccountModel } from '@/domain/test'
import { AuthContext } from '@/presentation/context'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'

import { PrivateRoute } from '.'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (
  account = { ...mockAccountModel(), accessToken: faker.datatype.uuid() }
): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <AuthContext.Provider value={{ getCurrentAccount: () => account, setCurrentAccount: vi.fn() }}>
      <Router location={history.location} navigator={history}>
        <PrivateRoute component={<>any route</>}></PrivateRoute>
      </Router>
    </AuthContext.Provider>
  )

  return { history }
}

describe('PrivateRoute', () => {
  test('should redirect to /auth if token is empty', () => {
    // @ts-expect-error
    const { history } = makeSut(null)

    expect(history.location.pathname).toBe('/auth')
  })

  test('should render current component if token is not empty', () => {
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/')
  })
})
