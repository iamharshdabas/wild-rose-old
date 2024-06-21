import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import DefaultLayout from './layout'

import Bookings from '@/pages/bookings'
import Dashboard from '@/pages/dashboard'
import RoomList from '@/pages/room/list'
import Settings from '@/pages/settings'
import Users from '@/pages/users'

const App = () => {
  return (
    <Routes>
      <Route index element={<Navigate replace to="/dashboard" />} />
      <Route
        element={
          <DefaultLayout>
            <Outlet />
          </DefaultLayout>
        }
      >
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Bookings />} path="/bookings" />
        <Route element={<Outlet />} path="/room">
          <Route index element={<Navigate replace to="list" />} />
          <Route element={<RoomList />} path="list" />
        </Route>
        <Route element={<Users />} path="/users" />
        <Route element={<Settings />} path="/settings" />
      </Route>
    </Routes>
  )
}

export default App
