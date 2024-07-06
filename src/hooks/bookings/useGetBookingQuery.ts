import { useQuery } from '@tanstack/react-query'

import { siteConfig } from '@/utils/site'
import getBooking from '@/api/bookings/getBooking'

const useGetBookingQuery = (id: number) => {
  const query = useQuery({
    queryKey: [siteConfig.queryKey.bookings, id],
    queryFn: () => getBooking(id),
  })

  return query
}

export default useGetBookingQuery
