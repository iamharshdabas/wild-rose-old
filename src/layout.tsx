import { Navbar } from '@/components/navbar'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-grow px-6 pt-16">
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          {children}
        </section>
      </main>
    </div>
  )
}
