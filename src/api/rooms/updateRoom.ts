import supabase from '@/utils/supabase'
import { RoomCreateProps } from '@/types/room'

const updateRoom = async ({
  id,
  room,
}: {
  id: number
  room: RoomCreateProps
}) => {
  const { data, error } = await supabase.from('rooms').update(room).eq('id', id)

  if (error) {
    throw new Error(`${error.message}`)
  }

  return data
}

export default updateRoom
