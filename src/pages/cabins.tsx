import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/table'

import DefaultLayout from '@/layout'
import getCabins from '@/api/getCabins'
import { CabinColumnProps, CabinProps } from '@/types/cabin'

export default function Cabins() {
  const { data: cabins } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  })

  const columns: CabinColumnProps[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'created_at',
      label: 'Created At',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'price',
      label: 'Price',
    },
  ]

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg justify-center text-center">
          <Table aria-label="cabins table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={cabins}>
              {(item: CabinProps) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </DefaultLayout>
  )
}
