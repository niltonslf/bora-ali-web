import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'

import {
  CreateEventFactory,
  EventFactory,
  EventMapFactory,
  LoginFactory,
} from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components/PrivateRoute'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/auth' element={<LoginFactory />}></Route>

        <Route path='/' element={<PrivateRoute component={<EventMapFactory />} />}></Route>

        <Route path='/event/:eventId' element={<PrivateRoute component={<EventFactory />} />} />

        <Route path='/create-event' element={<PrivateRoute component={<CreateEventFactory />} />} />
      </Router>
    </BrowserRouter>
  )
}

Routes.displayName = 'Routes'
