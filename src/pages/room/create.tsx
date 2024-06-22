import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { Slider } from '@nextui-org/slider'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import incrementNumber from '@/utils/incrementNumber'
import getRandomPrice from '@/utils/getRandomPrice'
import getRandomImage from '@/utils/getRandomImage'
import { RoomCreateProps } from '@/types/room'
import useGetLastRoomQuery from '@/hooks/rooms/useGetLastRoomQuery'
import useCreateRoomMutation from '@/hooks/rooms/useCreateRoomMutation'
import { siteConfig } from '@/config/site'

const RoomCreate = () => {
  const queryClient = useQueryClient()

  const { data: lastRoom } = useGetLastRoomQuery()

  const { mutate, isPending } = useCreateRoomMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [siteConfig.queryKey.rooms] })
      queryClient.invalidateQueries({
        queryKey: [siteConfig.queryKey.lastRoom],
      })
      reset(defaultValues)
    },
  })

  const defaultValues = {
    name: incrementNumber({ initial: lastRoom?.name || 0 }),
    price: getRandomPrice(1000, 10000, 250),
    bedroom: getRandomImage('bedroom'),
    bathroom: getRandomImage('bathroom'),
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [bathroomImageSrc, setBathroomImageSrc] = useState(
    getRandomImage('bathroom')
  )
  const [bedroomImageSrc, setBedroomImageSrc] = useState(
    getRandomImage('bedroom')
  )
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<RoomCreateProps>({
    defaultValues: defaultValues,
  })

  useEffect(() => {
    if (lastRoom) {
      setValue('name', incrementNumber({ initial: lastRoom.name }))
    }
  }, [lastRoom, setValue])

  return (
    <>
      <Button
        onPress={() => {
          onOpen()
          reset(defaultValues)
        }}
      >
        Create
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">Create Room</ModalHeader>
              <ModalBody>
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit((data) => {
                    const room: RoomCreateProps[] = [
                      {
                        name: data.name,
                        price: data.price,
                        bedroom: data.bedroom,
                        bathroom: data.bathroom,
                      },
                    ]

                    mutate(room)
                    onClose()
                  })}
                >
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        description={'Use 1 if there is no data in the table.'}
                        errorMessage={errors.name?.message}
                        label="Name"
                        type="number"
                        value={field.value.toString()}
                      />
                    )}
                    rules={{ required: 'This field is required' }}
                  />
                  <Controller
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <div>
                        <Slider
                          {...field}
                          showTooltip
                          formatOptions={{ style: 'currency', currency: 'INR' }}
                          label="Price"
                          maxValue={10000}
                          minValue={1000}
                          step={250} // TODO: this value must be same as priceStep. in future get this from api
                          tooltipValueFormatOptions={{
                            style: 'currency',
                            currency: 'INR',
                          }}
                          onChange={(value) => field.onChange(value)}
                        />
                      </div>
                    )}
                  />
                  <div className="space-y-2">
                    <Image
                      isBlurred
                      alt="Bathroom image"
                      height={1024}
                      src={bathroomImageSrc}
                      width={1536}
                    />
                    <Button
                      onPress={() =>
                        setBathroomImageSrc(getRandomImage('bathroom'))
                      }
                    >
                      Get Random Image
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Image
                      isBlurred
                      alt="Room image"
                      height={1024}
                      src={bedroomImageSrc}
                      width={1536}
                    />
                    <Button
                      onPress={() =>
                        setBedroomImageSrc(getRandomImage('bedroom'))
                      }
                    >
                      Get Random Image
                    </Button>
                  </div>
                  <div className="flex justify-end gap-2 py-2">
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
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default RoomCreate
