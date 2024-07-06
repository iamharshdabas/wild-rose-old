import { useQuery } from '@tanstack/react-query'

import { siteConfig } from '@/utils/site'
import getBookings from '@/api/bookings/getBookings'

const useGetBookingsQuery = () => {
  const query = useQuery({
    queryKey: [siteConfig.queryKey.bookings],
    queryFn: getBookings,
  })

  return query
}

export default useGetBookingsQuery
