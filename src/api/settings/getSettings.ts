import supabase from '@/config/supabase'
import { SettingsProps } from '@/types/settings'

const getSettings = async (): Promise<SettingsProps> => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    throw new Error(`${error}`)
  }

  return data
}

export default getSettings
