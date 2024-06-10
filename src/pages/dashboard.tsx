import DefaultLayout from '@/layout'
import { title } from '@/config/primitives'

export default function Dashboard() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg justify-center text-center">
          <h1 className={title()}>Dashboard</h1>
        </div>
      </section>
    </DefaultLayout>
  )
}
