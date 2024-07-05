import supabase from '@/utils/supabase'
import { SettingsProps } from '@/types/settings'

const updateSettings = async (settings: SettingsProps) => {
  const { data, error } = await supabase
    .from('settings')
    .update(settings)
    .eq('id', 1)

  if (error) {
    throw new Error(`${error.message}`)
  }

  return data
}

export default updateSettings
