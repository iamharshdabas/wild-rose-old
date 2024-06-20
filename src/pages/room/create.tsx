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
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createRoom } from '@/api/room'
import { RoomCreateProps } from '@/types/room'
import { getRandomImage } from '@/utils/getRandomImage'

export default function RoomCreate({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<number>>
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomCreateProps>()

  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const sliderValueRef = useRef(1500)
  const [imageSrc, setImageSrc] = useState(getRandomImage())

  const { isPending, mutate } = useMutation({
    mutationFn: (room: RoomCreateProps[]) => createRoom(room),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      toast.success('Room successfully created')
      reset()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      sliderValueRef.current = value
    } else if (Array.isArray(value)) {
      sliderValueRef.current = value[0]
    }
  }

  const handleImageChange = () => {
    setImageSrc(getRandomImage())
  }

  return (
    <>
      <Button onPress={onOpen}>Create</Button>
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
                        price: sliderValueRef.current,
                        image: imageSrc,
                      },
                    ]

                    setPage(1)
                    mutate(room)
                    onClose()
                  })}
                >
                  <Input
                    isRequired
                    errorMessage="This field is required"
                    isInvalid={Boolean(errors.name)}
                    label="Name"
                    type="text"
                    {...register('name', { required: true })}
                  />
                  <div>
                    {/* TODO: set minValue from settings using api */}
                    <Slider
                      showTooltip
                      defaultValue={sliderValueRef.current}
                      formatOptions={{ style: 'currency', currency: 'INR' }}
                      label="Price"
                      maxValue={2000}
                      minValue={1000}
                      step={25}
                      tooltipValueFormatOptions={{
                        style: 'currency',
                        currency: 'INR',
                      }}
                      onChange={handleSliderChange}
                    />
                  </div>
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
                  <div className="flex justify-end py-2">
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
