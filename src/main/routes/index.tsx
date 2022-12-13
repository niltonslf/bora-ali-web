import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'

import { Login } from '@/presentation/pages/Login'

import { EventMapFactory } from '../factories/pages'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/auth' element={<Login />}></Route>
        <Route path='/' element={<EventMapFactory />}></Route>
      </Router>
    </BrowserRouter>
  )
}

Routes.displayName = 'Routes'
