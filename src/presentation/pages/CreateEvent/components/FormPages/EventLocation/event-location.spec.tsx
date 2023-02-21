import { describe, expect, test, vi } from 'vitest'

import { render, screen, waitFor } from '@testing-library/react'

import { EventLocation } from '.'

vi.mock('@react-google-maps/api', () => {
  return {
    useLoadScript: () => ({ isLoaded: true }),
    Marker: (props: any) => <div />,
    Autocomplete: (props: any) => <div>{props.children}</div>,
    GoogleMap: (props: any) => (
      <div>
        <div className='mock-google-maps' />
        {props.children}
      </div>
    ),
  }
})

const makeSut = () => {
  render(<EventLocation />)
}

describe('<EventLocation />', () => {
  test('should load with all elements', async () => {
    makeSut()

    expect(screen.getByTestId('event-location-title')).toBeInTheDocument()
    expect(screen.getByTestId('event-map')).toBeInTheDocument()

    await waitFor(async () => {
      expect(screen.queryByTestId('event-address-input')).toBeInTheDocument()
    })
  })
})
