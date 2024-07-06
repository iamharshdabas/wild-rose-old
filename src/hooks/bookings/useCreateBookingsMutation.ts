import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { UseMutationProps } from '@/types/use-mutation'
import { BookingCreateProps } from '@/types/booking'
import createBookings from '@/api/bookings/createBookings'

const useCreateBookingsMutation = ({
  onSuccess,
  onError,
}: UseMutationProps = {}) => {
  const mutation = useMutation({
    mutationFn: (booking: BookingCreateProps[]) => createBookings(booking),
    onSuccess: () => {
      toast.success('Booking created successfully')
      if (onSuccess) onSuccess()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      if (onError) onError(error)
    },
  })

  return mutation
}

export default useCreateBookingsMutation
