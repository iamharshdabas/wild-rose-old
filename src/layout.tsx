import { Navbar } from '@/components/navbar'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-grow px-4 pt-16">
        <section className="flex flex-col items-center justify-center gap-4">
          {children}
        </section>
      </main>
    </div>
  )
}
