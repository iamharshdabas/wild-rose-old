import { useQuery } from '@tanstack/react-query'

import { siteConfig } from '@/utils/site'
import getRoom from '@/api/rooms/getRoom'

const useGetRoomQuery = (id: number) => {
  const query = useQuery({
    queryKey: [siteConfig.queryKey.rooms, id],
    queryFn: () => getRoom(id),
  })

  return query
}

export default useGetRoomQuery
