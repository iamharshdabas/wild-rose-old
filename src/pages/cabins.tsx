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
import { useCallback, useState } from 'react'
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

import getCabins from '@/api/getCabins'
import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import EyeIcon from '@/components/icons/eye'
import DefaultLayout from '@/layout'
import { CabinColumnProps, CabinProps } from '@/types/cabin'
import { subtitle, title } from '@/config/primitives'

export default function Cabins() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState('')

  const columns: { key: CabinColumnProps; label: string }[] = [
    { key: 'image', label: 'Image' },
    { key: 'id', label: 'ID' },
    { key: 'created_at', label: 'Created At' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'actions', label: 'Actions' },
  ]

  const renderCell = useCallback(
    (cabins: CabinProps, columnKey: CabinColumnProps) => {
      const cellValue = cabins[columnKey]

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
              <Tooltip content="Edit cabin">
                <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete cabin">
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
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block w-full max-w-7xl justify-center text-center">
          <h1 className={title()}>Cabins</h1>
        </div>
        <div className="inline-block w-full max-w-7xl justify-center text-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <Table aria-label="cabins table">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>
                    <span className={cn(subtitle(), 'flex justify-center')}>
                      {column.label}
                    </span>
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody emptyContent={'No rows to display.'} items={cabins}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCell(item, columnKey as CabinColumnProps)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Cabin
                  </ModalHeader>
                  <ModalBody>
                    <Image
                      isZoomed
                      alt="Cabin image"
                      height={768}
                      src={selectedImage}
                      width={512}
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
      </section>
    </DefaultLayout>
  )
}
