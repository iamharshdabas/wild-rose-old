import supabase from '@/config/supabase'

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
