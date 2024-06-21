import { Toaster } from 'react-hot-toast'

import { Navbar } from '@/components/navbar'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <Toaster
        gutter={12}
        position="top-center"
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 5000 },
        }}
      />
      <main className="container mx-auto flex-grow px-4 pt-16">
        <section className="flex flex-col items-center justify-center gap-4">
          {children}
        </section>
      </main>
    </div>
  )
}

export default DefaultLayout
