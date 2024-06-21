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
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createRoom, getLastRoom } from '@/api/room'
import { RoomCreateProps } from '@/types/room'
import { getRandomImage } from '@/utils/getRandomImage'
import incrementNumber from '@/utils/incrementNumber'
import getRandomPrice from '@/utils/getRandomPrice'

export default function RoomCreate() {
  const queryClient = useQueryClient()

  const { data: lastRoom } = useQuery({
    queryKey: ['last_room'],
    queryFn: getLastRoom,
  })

  const { isPending, mutate } = useMutation({
    mutationFn: (room: RoomCreateProps[]) => createRoom(room),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      queryClient.invalidateQueries({ queryKey: ['last_room'] })
      toast.success('Room successfully created')
      reset(defaultValues)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const defaultValues = {
    name: incrementNumber({ initial: lastRoom?.name || 0 }),
    price: getRandomPrice(1000, 10000, 250),
    image: getRandomImage(),
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [imageSrc, setImageSrc] = useState(getRandomImage())
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

  const handleImageChange = () => {
    setImageSrc(getRandomImage())
  }

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
              <ModalHeader className="flex flex-col gap-1">
                Create Room
              </ModalHeader>
              <ModalBody>
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit((data) => {
                    const room: RoomCreateProps[] = [
                      {
                        name: data.name,
                        price: data.price,
                        image: imageSrc,
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
                      alt="Room image"
                      height={1024}
                      src={imageSrc}
                      width={1536}
                    />
                    <Button onPress={handleImageChange}>
                      Get Random Image
                    </Button>
                  </div>
                  <div className="flex justify-end gap-1 py-2">
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
