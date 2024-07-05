import { useQuery } from '@tanstack/react-query'

import { siteConfig } from '@/utils/site'
import getGuest from '@/api/guests/getGuest'

const useGetGuestQuery = (id: number) => {
  const query = useQuery({
    queryKey: [siteConfig.queryKey.guests, id],
    queryFn: () => getGuest(id),
  })

  return query
}

export default useGetGuestQuery
