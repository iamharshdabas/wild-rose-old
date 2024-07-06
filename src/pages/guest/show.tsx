import { Button } from '@nextui-org/button'
import { Code } from '@nextui-org/code'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { Spinner } from '@nextui-org/spinner'
import { cn } from '@nextui-org/theme'
import { Eye } from 'lucide-react'

import useGetGuestQuery from '@/hooks/guests/useGetGuestQuery'
import calculateAge from '@/utils/calculateAge'
import { title as nextUiTitle } from '@/utils/primitives'

const GuestShow = ({ id, title }: { id: number; title: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { data: guest, isLoading } = useGetGuestQuery(id)

  return (
    <>
      <Button
        color={title ? 'default' : 'primary'}
        isIconOnly={!title}
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
              <ModalHeader className="flex flex-col">Guest details</ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-4">
                      <h1 className={cn(nextUiTitle({ size: 'sm' }))}>
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
