import { Input } from '@nextui-org/input'
import { Pagination } from '@nextui-org/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table'
import { cn } from '@nextui-org/theme'
import { ChangeEvent, ReactNode, useCallback, useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import { subtitle } from '@/utils/primitives'

interface DataTableProps<T> {
  data: T[]
  columns: { key: keyof T; label: string }[]
  renderCell: (item: T, columnKey: keyof T) => ReactNode
  toFilter: keyof T
  populateComponent?: ReactNode
  createComponent?: ReactNode
}

const DataTable = <T extends { id: number }>({
  data,
  columns,
  renderCell,
  toFilter,
  populateComponent,
  createComponent,
}: DataTableProps<T>) => {
  const [filterValue, setFilterValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    if (!data) return []

    let filteredRooms = data

    if (hasSearchFilter) {
      filteredRooms = filteredRooms.filter((item) => {
        const value = item[toFilter]

        if (value !== null && value !== undefined) {
          return value
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        }

        return null
      })
    }

    return filteredRooms
  }, [data, filterValue, hasSearchFilter, toFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    },
    []
  )

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search..."
            startContent={<Search />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex justify-end gap-4">
            {populateComponent}
            {createComponent}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {data?.length} rooms
          </span>
          <label className="flex items-center gap-2 text-small text-default-400">
            Rows per page:
            <select
              className="rounded-lg px-2 py-1 text-small text-default-400 outline-none"
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    rowsPerPage,
    data?.length,
    hasSearchFilter,
  ])

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-center">
        <Pagination
          loop
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          variant="bordered"
          onChange={(page) => setPage(page)}
        />
      </div>
    )
  }, [page, pages])

  return (
    <Table
      aria-label="rooms table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={String(column.key)}
            className={cn(subtitle(), 'text-center')}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No rows to display.'} items={items}>
        {(item: T) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as keyof T)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default DataTable
