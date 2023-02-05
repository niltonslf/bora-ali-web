import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, test, expect } from 'vitest'

import { EventModel } from '@/domain/models'
import { mockEventModel } from '@/domain/test/mock-fetch-event'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'

import { EventCard } from '.'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (event: EventModel): SutTypes => {
  const history = createMemoryHistory()

  render(
    <Router location={history.location} navigator={history}>
      <EventCard event={event} />
    </Router>
  )

  return {
    history,
  }
}

describe('<EventCard />', () => {
  test('should render with correct values', () => {
    const description = faker.random.words()
    const images = [{ image: faker.image.cats() }]
    const name = faker.name.fullName()

    const event = {
      ...mockEventModel(),
      description,
      images,
      name,
    }

    makeSut(event)

    expect(screen.getByTestId('image')).toHaveAttribute('src')
    expect(screen.getByTestId('title')).toHaveTextContent(name)
    expect(screen.getByTestId('description')).toHaveTextContent(description)
  })

  test('EventCard should redirect to another page when clicked', async () => {
    const { history } = makeSut(mockEventModel())

    const eventItem = screen.getByTestId('event-item')
    fireEvent.click(eventItem)

    expect(history.location.pathname).not.toBe('/')
  })
})
