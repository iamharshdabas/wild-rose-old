import { Spinner } from '@nextui-org/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table'
import { Tooltip } from '@nextui-org/tooltip'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { cn } from '@nextui-org/theme'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { Avatar } from '@nextui-org/avatar'
import { Image } from '@nextui-org/image'
import { Button } from '@nextui-org/button'
import { Pagination } from '@nextui-org/pagination'

import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import EyeIcon from '@/components/icons/eye'
import { subtitle, title } from '@/config/primitives'
import getRooms from '@/api/room/list'
import { RoomsColumnProps, RoomsProps } from '@/types/room'

export default function RoomList() {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState('')
  const [page, setPage] = useState(1)
  const rowsPerPage = 12

  const pages = rooms ? Math.ceil(rooms.length / rowsPerPage) : 1

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return rooms?.slice(start, end)
  }, [page, rooms])

  const columns: { key: RoomsColumnProps; label: string }[] = [
    { key: 'image', label: 'Image' },
    { key: 'id', label: 'ID' },
    { key: 'created_at', label: 'Created At' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'actions', label: 'Actions' },
  ]

  const renderCell = useCallback(
    (rooms: RoomsProps, columnKey: RoomsColumnProps) => {
      const cellValue = rooms[columnKey]

      switch (columnKey) {
        case 'image':
          return (
            <div className="flex justify-center">
              <Avatar
                isBordered
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
                <span className="cursor-pointer text-lg text-danger active:opacity-50">
                  <DeleteIcon />
                </span>
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
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>
                  <span className={cn(subtitle(), 'flex justify-center')}>
                    {column.label}
                  </span>
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={'No rows to display.'} items={items}>
              {(item: RoomsProps) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(item, columnKey as RoomsColumnProps)}
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
