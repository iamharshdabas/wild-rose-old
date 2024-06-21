import { useQuery } from '@tanstack/react-query'

import getLastRoom from '@/api/rooms/getLastRoom'
import { siteConfig } from '@/config/site'

const useGetLastRoomQuery = () => {
  const query = useQuery({
    queryKey: [siteConfig.queryKey.lastRoom],
    queryFn: getLastRoom,
  })

  return query
}

export default useGetLastRoomQuery
