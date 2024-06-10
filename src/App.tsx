import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import RoomList from '@/pages/room/list'
import Dashboard from '@/pages/dashboard'
import Bookings from '@/pages/bookings'
import Users from '@/pages/users'
import Settings from '@/pages/settings'

function App() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/dashboard" />} path="/" />
      <Route element={<Dashboard />} path="/dashboard" />
      <Route element={<Bookings />} path="/bookings" />
      <Route element={<Outlet />} path="/room">
        <Route index element={<Navigate replace to="list" />} />
        <Route element={<RoomList />} path="list" />
      </Route>
      <Route element={<Users />} path="/users" />
      <Route element={<Settings />} path="/settings" />
    </Routes>
  )
}

export default App
