import { useQuery } from '@tanstack/react-query'

import { siteConfig } from '@/config/site'
import getSettings from '@/api/settings/getSettings'

const useGetSettingsQuery = () => {
  const query = useQuery({
    queryKey: [siteConfig.queryKey.settings],
    queryFn: () => getSettings(),
  })

  return query
}

export default useGetSettingsQuery
