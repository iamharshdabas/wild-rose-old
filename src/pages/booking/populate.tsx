import { Button } from '@nextui-org/button'
import { Code } from '@nextui-org/code'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { cn } from '@nextui-org/theme'
import { useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

import GuestPopulate from '../guest/populate'
import RoomPopulate from '../room/populate'

import useCreateBookingsMutation from '@/hooks/bookings/useCreateBookingsMutation'
import useGetGuestsQuery from '@/hooks/guests/useGetGuestsQuery'
import useGetRoomsQuery from '@/hooks/rooms/useGetRoomsQuery'
import { BookingCreateProps, BookingStatusProps } from '@/types/booking'
import { subtitle } from '@/utils/primitives'
import { siteConfig } from '@/utils/site'
import getRandomPrice from '@/utils/getRandomPrice'
import useGetSettingsQuery from '@/hooks/settings/useGetSettingsQuery'
import getRandomDate from '@/utils/getRandomDate'
import incrementDate from '@/utils/incrementDate'

interface PopulatebookingProps {
  totalBookings: number
}

const BookingPopulate = () => {
  const queryClient = useQueryClient()
  const { data: rooms } = useGetRoomsQuery()
  const { data: guests } = useGetGuestsQuery()
  const { data: settings } = useGetSettingsQuery()
  const { mutate, isPending } = useCreateBookingsMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [siteConfig.queryKey.bookings],
      })
    },
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PopulatebookingProps>({
    defaultValues: { totalBookings: Math.ceil(Math.random() * 10) },
  })

  const onSubmit = async (data: PopulatebookingProps) => {
    const bookings: BookingCreateProps[] = []

    if (rooms && guests && settings) {
      for (let i = 0; i < data.totalBookings; i++) {
        const startDate = getRandomDate()
        const nights = Math.ceil(Math.random() * 10)
        const endDate = incrementDate(startDate, nights)

        const price = getRandomPrice(
          settings.priceMin,
          settings.priceMax,
          settings.priceStep
        )

        let status: BookingStatusProps
        const paid = Math.random() > 0.1 ? true : false

        if (paid) {
          status = Math.random() > 0.4 ? 'checked-in' : 'checked-out'
        } else {
          status = 'unpaid'
        }

        const booking: BookingCreateProps = {
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          totalNights: nights,
          totalGuests: Math.ceil(Math.random() * 4),
          price: price,
          paid: paid,
          status: status,
          guestID: guests[Math.floor(Math.random() * guests?.length)].id,
          roomID: rooms[Math.floor(Math.random() * rooms.length)].id,
        }

        bookings.push(booking)
      }
    }

    mutate(bookings)
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
        Populate bookings
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                populate bookings
              </ModalHeader>
              {rooms?.length === 0 || guests?.length === 0 ? (
                <>
                  <ModalBody>
                    <h1 className={cn(subtitle(), 'text-danger')}>
                      There are no{' '}
                      {rooms?.length === 0 && <Code color="danger">rooms</Code>}
                      {rooms?.length === 0 && guests?.length === 0 && ' and '}
                      {guests?.length === 0 && (
                        <Code color="danger">guests</Code>
                      )}{' '}
                      to create Booking.
                    </h1>
                    <div className="flex flex-col justify-evenly gap-4 sm:flex-row">
                      {rooms?.length === 0 && <RoomPopulate />}
                      {guests?.length === 0 && <GuestPopulate />}
                    </div>
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
                  </ModalFooter>
                </>
              ) : (
                <form
                  onSubmit={handleSubmit((data) => {
                    onSubmit(data)
                    onClose()
                  })}
                >
                  <ModalBody>
                    <Controller
                      control={control}
                      name="totalBookings"
                      render={({ field }) => (
                        <Input
                          {...field}
                          isRequired
                          description="Total number of bookings to populate."
                          errorMessage={errors.totalBookings?.message}
                          label="Total bookings"
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
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default BookingPopulate
