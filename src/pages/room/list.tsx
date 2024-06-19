import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { Pagination } from '@nextui-org/pagination'
import { Spinner } from '@nextui-org/spinner'
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table'
import { cn } from '@nextui-org/theme'
import { Tooltip } from '@nextui-org/tooltip'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import RoomCreate from './create'

import { RoomColumnProps, RoomProps } from '@/types/room'
import { subtitle, title } from '@/config/primitives'
import EyeIcon from '@/components/icons/eye'
import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'
import { SearchIcon } from '@/components/icons'
import { deleteRooms, getRooms } from '@/api/room'
import PopulateRooms from '@/utils/populate/rooms'

export default function RoomList() {
  const queryClient = useQueryClient()

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  })

  const { isPending, mutate } = useMutation({
    mutationFn: (id: number) => deleteRooms(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      toast.success('Room successfully deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'id',
    direction: 'ascending',
  })

  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    if (!rooms) return []

    let filteredRooms = rooms

    if (hasSearchFilter) {
      filteredRooms = filteredRooms.filter((room) =>
        room.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }

    return filteredRooms
  }, [rooms, filterValue])

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

  const sortedItems = useMemo(() => {
    return [...items].sort((a: RoomColumnProps, b: RoomColumnProps) => {
      const first = a[sortDescriptor.column as keyof RoomColumnProps] as number
      const second = b[sortDescriptor.column as keyof RoomColumnProps] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

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
        <div className="flex items-end justify-between gap-4">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="space-x-4">
            <PopulateRooms />
            <RoomCreate />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {rooms?.length} rooms
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
    rooms?.length,
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

  const columns: {
    key: RoomColumnProps
    label: string
    sortable?: boolean
  }[] = useMemo(
    () => [
      { key: 'image', label: 'Image' },
      { key: 'id', label: 'ID', sortable: true },
      { key: 'created_at', label: 'Created At', sortable: true },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'price', label: 'Price', sortable: true },
      { key: 'actions', label: 'Actions' },
    ],
    []
  )

  const renderCell = useCallback(
    (rooms: RoomProps, columnKey: RoomColumnProps) => {
      const cellValue = rooms[columnKey]

      switch (columnKey) {
        case 'image':
          return (
            <div className="flex justify-center">
              <Avatar
                isBordered
                className="cursor-pointer"
                radius="sm"
                size="lg"
                src={cellValue.toString()}
                onClick={() => {
                  onOpen()
                  setSelectedImage(cellValue.toString())
                }}
              />
            </div>
          )
        case 'id':
          return <h2 className={subtitle()}>{cellValue}</h2>
        case 'created_at':
          const formattedDate = new Date(cellValue).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          )

          return <h2 className={subtitle()}>{formattedDate}</h2>
        case 'name':
          return <h2 className={subtitle()}>{cellValue}</h2>
        case 'price':
          return (
            <h2 className={subtitle()}>
              <span>$</span>
              {cellValue}
            </h2>
          )
        case 'actions': // TODO: onClick CRUD operations
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details">
                <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit room">
                <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete room">
                <Button
                  isIconOnly
                  color="danger"
                  disabled={isPending}
                  variant="light"
                  onClick={() => mutate(rooms.id)}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          )
        default:
          return cellValue
      }
    },
    []
  )

  return (
    <>
      <div className="w-full max-w-7xl text-center">
        <h1 className={title()}>Rooms</h1>
      </div>
      <div className="w-full max-w-7xl pb-16 text-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            aria-label="rooms table"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.key}
                  allowsSorting={column.sortable}
                  className={cn(subtitle(), 'text-center')}
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={'No rows to display.'} items={sortedItems}>
              {(item: RoomProps) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(item, columnKey as RoomColumnProps)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Room</ModalHeader>
                <ModalBody>
                  <Image
                    isBlurred
                    alt="Room image"
                    height={1024}
                    src={selectedImage}
                    width={1536}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  {/*
                   * TODO: implement image actions
                   */}
                  {/* <Button color="primary" onPress={onClose}> */}
                  {/*   Action */}
                  {/* </Button> */}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
