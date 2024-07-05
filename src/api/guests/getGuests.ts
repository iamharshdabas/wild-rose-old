import supabase from '@/utils/supabase'
import { GuestProps } from '@/types/guest'

const getGuests = async (): Promise<GuestProps[]> => {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}

export default getGuests
