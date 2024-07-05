import supabase from '@/utils/supabase'

const deleteRooms = async (id: number) => {
  const { data, error } = await supabase.from('rooms').delete().eq('id', id)

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}

export default deleteRooms
