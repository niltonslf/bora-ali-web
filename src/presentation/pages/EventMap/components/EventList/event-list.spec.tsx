import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, test, expect } from 'vitest'

import { mockEventListModel } from '@/domain/test'
import { FetchEventSpy } from '@/presentation/test'
import { ThemeWrapper } from '@/presentation/test/theme-wrapper'
import { act, fireEvent, render, screen } from '@testing-library/react'

import { EventList } from '.'

type SutTypes = {
  fetchEventSpy: FetchEventSpy
  history: MemoryHistory
}

const makeSut = (fetchEventSpy = new FetchEventSpy()): SutTypes => {
  const history = createMemoryHistory()
  const events = mockEventListModel()

  render(
    <Router location={history.location} navigator={history}>
      <EventList events={events} />
    </Router>,
    { wrapper: ThemeWrapper }
  )

  return {
    fetchEventSpy,
    history,
  }
}

describe('<EventList/>', () => {
  test('Should present 2 Events', async () => {
    makeSut()

    const eventList = screen.getByTestId('event-list')

    expect(eventList.querySelectorAll("[data-testid='event-item']").length).toBe(2)
  })

  test('EventCard should redirect to another page when clicked', async () => {
    const { history } = makeSut()

    const eventList = screen.getByTestId('event-list')
    await act(async () => eventList)

    const eventItems = screen.getAllByTestId('event-item')
    fireEvent.click(eventItems[0])

    expect(history.location.pathname).not.toBe('/')
  })
})
