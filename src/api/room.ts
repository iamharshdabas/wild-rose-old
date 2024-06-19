import supabase from '@/config/supabase'
import { RoomCreateProps } from '@/types/room'

export async function getRooms() {
  const { data, error } = await supabase.from('rooms').select('*')

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}

export async function deleteRooms(id: number) {
  const { data, error } = await supabase.from('rooms').delete().eq('id', id)

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}

export async function createRoom(room: RoomCreateProps[]) {
  const { data, error } = await supabase.from('rooms').insert(room)

  if (error) {
    throw new Error(`${error.message}`)
  }

  return data
}
