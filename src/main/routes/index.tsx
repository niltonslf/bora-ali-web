import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'

import { EventMapFactory, LoginFactory } from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components/PrivateRoute'
import { Event } from '@/presentation/pages'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/auth' element={<LoginFactory />}></Route>
        <Route path='/' element={<PrivateRoute component={<EventMapFactory />} />}></Route>
        <Route path='/event/:eventId' element={<PrivateRoute component={<Event />} />}></Route>
      </Router>
    </BrowserRouter>
  )
}

Routes.displayName = 'Routes'
