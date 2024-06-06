import { NextUIProvider } from '@nextui-org/system'
import { useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextUIProvider>
  )
}
