import { useQuery } from '@tanstack/react-query'

import getCabins from '@/api/getCabins'
import { title } from '@/components/primitives'
import DefaultLayout from '@/layout'

export default function Dashboard() {
  const { data } = useQuery({ queryKey: ['cabins'], queryFn: getCabins })

  console.log(data)

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
