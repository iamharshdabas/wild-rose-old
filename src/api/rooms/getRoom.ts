import supabase from '@/utils/supabase'
import { RoomProps } from '@/types/room'

const getRoom = async (id: number): Promise<RoomProps> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}

export default getRoom
