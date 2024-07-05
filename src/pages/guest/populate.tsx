import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

import useCreateGuestsMutation from '@/hooks/guests/useCreateGuestsMutation'
import getRandomGuests from '@/api/guests/getRandomGuests'
import { siteConfig } from '@/utils/site'

interface PopulateGuestProps {
  totalGuests: number
}

const GuestPopulate = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useCreateGuestsMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [siteConfig.queryKey.guests] })
    },
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PopulateGuestProps>({
    defaultValues: { totalGuests: Math.ceil(Math.random() * 10) },
  })

  const onSubmit = async (data: PopulateGuestProps) => {
    mutate(await getRandomGuests(data.totalGuests))
  }

  return (
    <>
      <Button
        variant="ghost"
        onPress={() => {
          onOpen()
          reset()
        }}
      >
        Populate guests
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                populate guests
              </ModalHeader>
              <form
                onSubmit={handleSubmit((data) => {
                  onSubmit(data)
                  onClose()
                })}
              >
                <ModalBody>
                  <Controller
                    control={control}
                    name="totalGuests"
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        description="Total number of rooms to populate."
                        errorMessage={errors.totalGuests?.message}
                        label="Total guests"
                        type="number"
                        value={field.value?.toString()}
                      />
                    )}
                    rules={{ required: 'This field is required' }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    type="reset"
                    variant="light"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button color="primary" isLoading={isPending} type="submit">
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default GuestPopulate
