import supabase from '@/config/supabase'
import { GuestProps } from '@/types/guest'

const getGuest = async (id: number): Promise<GuestProps> => {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}

export default getGuest
