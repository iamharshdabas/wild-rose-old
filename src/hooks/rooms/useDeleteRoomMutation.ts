import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import deleteRooms from '@/api/rooms/deleteRoom'
import { UseMutationProps } from '@/types/use-mutation'

const useDeleteRoomMutation = ({
  onSuccess,
  onError,
}: UseMutationProps = {}) => {
  const mutation = useMutation({
    mutationFn: (id: number) => deleteRooms(id),
    onSuccess: () => {
      toast.success('Room deleted successfully')
      if (onSuccess) onSuccess()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      if (onError) onError(error)
    },
  })

  return mutation
}

export default useDeleteRoomMutation
