import { NextUIProvider } from '@nextui-org/system'
import { useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export function Provider({ children }: { children: React.ReactNode }) {
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
