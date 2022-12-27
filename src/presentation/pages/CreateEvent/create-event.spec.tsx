import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import { render, screen } from '@testing-library/react'

import { CreateEvent } from '.'

describe('<CreateEvent/>', () => {
  describe('<EventTypePage />', () => {
    test('should load first page of event creation', () => {
      const history = createMemoryHistory()

      render(
        <Router location={history.location} navigator={history}>
          <CreateEvent />
        </Router>
      )

      expect(screen.getByTestId('event-type-title')).toBeInTheDocument()
    })
  })
})
