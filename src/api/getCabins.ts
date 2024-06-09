import supabase from '@/config/supabase'

export default async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}
