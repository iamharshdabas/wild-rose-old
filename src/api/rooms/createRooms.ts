import supabase from '@/utils/supabase'
import { RoomCreateProps } from '@/types/room'

const createRoom = async (room: RoomCreateProps[]) => {
  const { data, error } = await supabase.from('rooms').insert(room)

  if (error) {
    throw new Error(`${error.message}`)
  }

  return data
}

export default createRoom
