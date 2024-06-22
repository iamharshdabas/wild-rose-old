import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { UseMutationProps } from '@/types/use-mutation'
import { RoomCreateProps } from '@/types/room'
import updateRoom from '@/api/rooms/updateRoom'

const useUpdateRoomMutation = ({
  onSuccess,
  onError,
}: UseMutationProps = {}) => {
  const mutation = useMutation({
    mutationFn: (data: { id: number; room: RoomCreateProps }) =>
      updateRoom(data),
    onSuccess: () => {
      toast.success('Room updated successfully')
      if (onSuccess) onSuccess()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      if (onError) onError(error)
    },
  })

  return mutation
}

export default useUpdateRoomMutation
