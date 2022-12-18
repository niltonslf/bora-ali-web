import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'

import { EventMapFactory, LoginFactory } from '@/main/factories/pages'
import { Event } from '@/presentation/pages'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/auth' element={<LoginFactory />}></Route>
        <Route path='/' element={<EventMapFactory />}></Route>
        <Route path='/event/:eventId' element={<Event />}></Route>
      </Router>
    </BrowserRouter>
  )
}

Routes.displayName = 'Routes'
