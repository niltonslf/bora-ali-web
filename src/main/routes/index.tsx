import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'

import {
  CreateEventFactory,
  EventFactory,
  EventMapFactory,
  LoginFactory,
  ProfileFactory,
} from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components/PrivateRoute'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/auth' element={<LoginFactory />}></Route>

        <Route path='/' element={<PrivateRoute component={<EventMapFactory />} />} />

        <Route path='/event/:eventId' element={<PrivateRoute component={<EventFactory />} />} />

        <Route path='/create-event' element={<PrivateRoute component={<CreateEventFactory />} />} />
        <Route
          path='/edit-event/:eventId'
          element={<PrivateRoute component={<CreateEventFactory />} />}
        />

        <Route path='/profile' element={<PrivateRoute component={<ProfileFactory />} />} />
      </Router>
    </BrowserRouter>
  )
}

Routes.displayName = 'Routes'
