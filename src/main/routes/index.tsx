import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'

import { Event, Login } from '@/presentation/pages'

import { EventMapFactory } from '../factories/pages'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/auth' element={<Login />}></Route>
        <Route path='/' element={<EventMapFactory />}></Route>
        <Route path='/event/:eventId' element={<Event />}></Route>
      </Router>
    </BrowserRouter>
  )
}

Routes.displayName = 'Routes'
