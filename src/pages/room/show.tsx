import { Button } from '@nextui-org/button'
import { Code } from '@nextui-org/code'
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
import { Eye, House } from 'lucide-react'

import RoomEdit from './edit'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/carousel'
import useGetRoomQuery from '@/hooks/rooms/useGetRoomQuery'
import formatDate from '@/utils/formatDate'
import { title as nextUiTitle } from '@/utils/primitives'

const RoomShow = ({ id, title }: { id: number; title: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { data: room, isLoading } = useGetRoomQuery(id)

  return (
    <>
      <Button
        color={title ? 'default' : 'primary'}
        isIconOnly={!title}
        startContent={title && <House size={16} />}
        variant="light"
        onPress={onOpen}
      >
        {title ? title : <Eye />}
      </Button>
      {/* scrollBehavior="outside" TODO: uncomment this when there are bookings are there */}
      <Modal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">Room details</ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="flex flex-col gap-4">
                    <Carousel className="mx-8">
                      <CarouselContent>
                        <CarouselItem>
                          <Image
                            isBlurred
                            alt="Bedroom image"
                            height={1024}
                            src={room?.bedroom}
                            width={1536}
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <Image
                            isBlurred
                            alt="Bathroom image"
                            height={1024}
                            src={room?.bathroom}
                            width={1536}
                          />
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>

                    <div className="flex justify-between gap-4">
                      <Code>ID: {room?.id}</Code>
                      <p>
                        Created at:{' '}
                        {room?.created_at &&
                          formatDate(room?.created_at.toString())}
                      </p>
                    </div>
                    <div className="flex justify-between gap-4">
                      <h1 className={nextUiTitle({ size: 'sm' })}>
                        {room?.name}
                      </h1>
                      <h1 className={nextUiTitle({ size: 'sm' })}>
                        ₹{room?.price}
                      </h1>
                    </div>
                    <div className="flex items-center justify-center rounded-2xl p-4">
                      {/* TODO: implement this */}
                      <span className="text-danger">No bookings yet</span>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <RoomEdit id={id} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default RoomShow
