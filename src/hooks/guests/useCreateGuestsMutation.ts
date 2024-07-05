import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { UseMutationProps } from '@/types/use-mutation'
import { GuestCreateProps } from '@/types/guest'
import createGuests from '@/api/guests/createGuests'

const useCreateGuestsMutation = ({
  onSuccess,
  onError,
}: UseMutationProps = {}) => {
  const mutation = useMutation({
    mutationFn: (guest: GuestCreateProps[]) => createGuests(guest),
    onSuccess: () => {
      toast.success('Guest created successfully')
      if (onSuccess) onSuccess()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      if (onError) onError(error)
    },
  })

  return mutation
}

export default useCreateGuestsMutation
