import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'

import { EventMapFactory } from '../factories/pages'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/' element={<EventMapFactory />}></Route>
      </Router>
    </BrowserRouter>
  )
}

Routes.displayName = 'Routes'
