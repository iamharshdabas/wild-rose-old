import supabase from '@/config/supabase'
import { RoomProps } from '@/types/room'

const getLastRoom = async (): Promise<RoomProps> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}

export default getLastRoom
