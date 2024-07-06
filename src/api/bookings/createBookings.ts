import { BookingCreateProps } from '@/types/booking'
import supabase from '@/utils/supabase'

const createBookings = async (guest: BookingCreateProps[]) => {
  const { data, error } = await supabase.from('bookings').insert(guest)

  if (error) {
    throw new Error(`${error.message}`)
  }

  return data
}

export default createBookings
