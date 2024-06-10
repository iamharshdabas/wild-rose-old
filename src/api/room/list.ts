import supabase from '@/config/supabase'

export default async function getRooms() {
  const { data, error } = await supabase.from('rooms').select('*')

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}
