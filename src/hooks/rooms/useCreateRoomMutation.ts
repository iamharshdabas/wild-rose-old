import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { UseMutationProps } from '@/types/use-mutation'
import createRoom from '@/api/rooms/createRooms'
import { RoomCreateProps } from '@/types/room'

const useCreateRoomMutation = ({
  onSuccess,
  onError,
}: UseMutationProps = {}) => {
  const mutation = useMutation({
    mutationFn: (room: RoomCreateProps[]) => createRoom(room),
    onSuccess: () => {
      toast.success('Room created successfully')
      if (onSuccess) onSuccess()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      if (onError) onError(error)
    },
  })

  return mutation
}

export default useCreateRoomMutation
