import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { Spinner } from '@nextui-org/spinner'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { Trash } from 'lucide-react'
import { cn } from '@nextui-org/theme'

import RoomShow from './show'
import RoomEdit from './edit'
import RoomPopulate from './populate'
import RoomCreate from './create'

import { RoomColumnProps, RoomProps } from '@/types/room'
import { subtitle, title } from '@/utils/primitives'
import useGetRoomsQuery from '@/hooks/rooms/useGetRoomsQuery'
import useDeleteRoomMutation from '@/hooks/rooms/useDeleteRoomMutation'
import { siteConfig } from '@/utils/site'
import formatDate from '@/utils/formatDate'
import DataTable from '@/components/data-table'

const RoomList = () => {
  const queryClient = useQueryClient()
  const { data = [], isLoading } = useGetRoomsQuery()
  const { mutate, isPending } = useDeleteRoomMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [siteConfig.queryKey.rooms] })
      queryClient.invalidateQueries({
        queryKey: [siteConfig.queryKey.lastRoom],
      })
    },
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState('')

  const columns: {
    key: RoomColumnProps
    label: string
  }[] = useMemo(
    () => [
      { key: 'bedroom', label: 'Image' },
      { key: 'id', label: 'ID' },
      { key: 'created_at', label: 'Created At' },
      { key: 'name', label: 'Name' },
      { key: 'price', label: 'Price' },
      { key: 'actions', label: 'Actions' },
    ],
    []
  )

  const renderCell = useCallback(
    (rooms: RoomProps, columnKey: RoomColumnProps) => {
      const cellValue = rooms[columnKey]

      switch (columnKey) {
        case 'bedroom':
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
          return <h2 className={cn(subtitle(), 'text-center')}> {cellValue}</h2>
        case 'created_at':
          return (
            <h2 className={cn(subtitle(), 'text-center')}>
              {formatDate(cellValue.toString())}
            </h2>
          )
        case 'name':
          return <h2 className={cn(subtitle(), 'text-center')}>{cellValue}</h2>
        case 'price':
          return (
            <h2 className={cn(subtitle(), 'text-center')}>
              <span>$</span>
              {cellValue}
            </h2>
          )
        case 'actions':
          return (
            <>
              <div className="relative flex items-center justify-center gap-2">
                <RoomShow id={rooms.id} />
                <RoomEdit id={rooms.id} />
                <Button
                  isIconOnly
                  color="danger"
                  disabled={isPending}
                  variant="light"
                  onPress={() => mutate(rooms.id)}
                >
                  <Trash />
                </Button>
              </div>
            </>
          )
        default:
          return cellValue
      }
    },
    [isPending, mutate, onOpen, subtitle]
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
          <DataTable
            columns={columns}
            createComponent={<RoomCreate />}
            data={data}
            populateComponent={<RoomPopulate />}
            renderCell={renderCell}
            toFilter={'name'}
          />
        )}
        <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col">Bedroom</ModalHeader>
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
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default RoomList
