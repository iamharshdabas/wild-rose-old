import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import DefaultLayout from './layout'

import BookingList from '@/pages/booking/list'
import Dashboard from '@/pages/dashboard'
import GuestList from '@/pages/guest/list'
import RoomList from '@/pages/room/list'
import Settings from '@/pages/settings'

// PERF: make api, hooks and types DRY.

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
        <Route element={<BookingList />} path="/bookings" />
        <Route element={<Outlet />} path="/room">
          <Route index element={<Navigate replace to="list" />} />
          <Route element={<RoomList />} path="list" />
        </Route>
        <Route element={<GuestList />} path="/guests" />
        <Route element={<Settings />} path="/settings" />
      </Route>
    </Routes>
  )
}

export default App
