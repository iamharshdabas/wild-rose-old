import { Navigate, Route, Routes } from 'react-router-dom'

import Dashboard from '@/pages/dashboard'
import Bookings from '@/pages/bookings'
import Cabins from '@/pages/cabins'
import Users from '@/pages/users'
import Settings from '@/pages/settings'

function App() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/dashboard" />} path="/" />
      <Route element={<Dashboard />} path="/dashboard" />
      <Route element={<Bookings />} path="/bookings" />
      <Route element={<Cabins />} path="/cabins" />
      <Route element={<Users />} path="/users" />
      <Route element={<Settings />} path="/settings" />
    </Routes>
  )
}

export default App
