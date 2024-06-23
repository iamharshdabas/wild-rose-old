import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { UseMutationProps } from '@/types/use-mutation'
import updateSettings from '@/api/settings/updateSettings'
import { SettingsProps } from '@/types/settings'

const useUpdateSettingsMutation = ({
  onSuccess,
  onError,
}: UseMutationProps = {}) => {
  const mutation = useMutation({
    mutationFn: (settings: SettingsProps) => updateSettings(settings),
    onSuccess: () => {
      toast.success('Settings updated successfully')
      if (onSuccess) onSuccess()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      if (onError) onError(error)
    },
  })

  return mutation
}

export default useUpdateSettingsMutation
