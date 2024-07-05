import supabase from '@/utils/supabase'
import { GuestCreateProps } from '@/types/guest'

const createGuests = async (guest: GuestCreateProps[]) => {
  const { data, error } = await supabase.from('guests').insert(guest)

  if (error) {
    throw new Error(`${error.message}`)
  }

  return data
}

export default createGuests
