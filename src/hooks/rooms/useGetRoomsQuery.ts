import { useQuery } from '@tanstack/react-query'

import getRooms from '@/api/rooms/getRooms'
import { siteConfig } from '@/config/site'

const useGetRoomsQuery = () => {
  const query = useQuery({
    queryKey: [siteConfig.queryKey.rooms],
    queryFn: getRooms,
  })

  return query
}

export default useGetRoomsQuery
