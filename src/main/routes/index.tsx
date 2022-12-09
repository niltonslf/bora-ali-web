import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'

import { EventList } from '@/presentation/pages'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/' element={<EventList />}></Route>
      </Router>
    </BrowserRouter>
  )
}

Routes.displayName = 'Routes'
