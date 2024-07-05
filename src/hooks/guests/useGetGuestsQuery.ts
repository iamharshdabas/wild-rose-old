import { useQuery } from '@tanstack/react-query'

import { siteConfig } from '@/config/site'
import getGuests from '@/api/guests/getGuests'

const useGetGuestsQuery = () => {
  const query = useQuery({
    queryKey: [siteConfig.queryKey.guests],
    queryFn: getGuests,
  })

  return query
}

export default useGetGuestsQuery
