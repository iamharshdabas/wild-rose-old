import { BookingApiProps, BookingProps } from '@/types/booking'
import supabase from '@/utils/supabase'

const getBookings = async (): Promise<BookingProps[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, rooms(name), guests(name)')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`${error}`)
  }

  const formatedData = data.map((booking: BookingApiProps) => ({
    ...booking,
    roomName: booking.rooms?.name || 0,
    guestName: booking.guests?.name || 'undefined',
  }))

  return formatedData
}

export default getBookings
