import { Button } from '@nextui-org/button'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal'
import { Eye } from 'lucide-react'
import { Spinner } from '@nextui-org/spinner'
import { cn } from '@nextui-org/theme'
import { Code } from '@nextui-org/code'

import useGetGuestQuery from '@/hooks/guests/useGetGuestQuery'
import { title } from '@/utils/primitives'
import calculateAge from '@/utils/calculateAge'

const GuestShow = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { data: guest, isLoading } = useGetGuestQuery(id)

  return (
    <>
      <Button isIconOnly color="primary" variant="light" onPress={onOpen}>
        <Eye />
      </Button>
      {/* scrollBehavior="outside" TODO: uncomment this when there are bookings are there */}
      <Modal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">Guest details</ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-4">
                      <h1 className={cn(title({ size: 'sm' }))}>
                        {guest?.name}
                      </h1>
                      <div>
                        <Code size="lg">{calculateAge(guest?.dob || '')}</Code>
                        <Code className="uppercase" size="lg">
                          {guest?.gender}
                        </Code>
                      </div>
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default GuestShow
