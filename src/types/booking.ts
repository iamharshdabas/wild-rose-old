import { GuestProps } from './guest'
import { RoomProps } from './room'

export type BookingStatusProps = 'unpaid' | 'checked-in' | 'checked-out'

export type BookingProps = {
  id: number
  created_at: string
  startDate: string
  endDate: string
  totalNights: number
  totalGuests: number
  price: number
  paid: boolean
  status: BookingStatusProps
  roomID: number
  guestID: number
  roomName: number
  guestName: string
  // NOTE :dont touch this
  actions: string // NOTE: there is no use of actions here, it is here so that i dont have to create multiple types for `Cabin column` and `Cabins keyof`
}

export type BookingColumnProps = keyof BookingProps

export type BookingCreateProps = {
  startDate: string
  endDate: string
  totalNights: number
  totalGuests: number
  price: number
  paid: boolean
  status: BookingStatusProps
  roomID: number
  guestID: number
}

export interface BookingApiProps extends BookingProps {
  rooms: RoomProps
  guests: GuestProps
}
