import supabase from '@/utils/supabase'
import { RoomProps } from '@/types/room'

const getRooms = async (): Promise<RoomProps[]> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}

export default getRooms
