import { NextUIProvider } from '@nextui-org/system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useNavigate } from 'react-router-dom'

const queryClient = new QueryClient()

const Provider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextUIProvider>
  )
}

export default Provider
