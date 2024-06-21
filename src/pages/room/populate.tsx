import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Button } from '@nextui-org/button'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/modal'
import { Slider, SliderValue } from '@nextui-org/slider'
import { Input } from '@nextui-org/input'
import { useForm, Controller } from 'react-hook-form'

import { RoomCreateProps } from '@/types/room'
import { createRoom } from '@/api/room'
import incrementNumber from '@/utils/incrementNumber'
import { getRandomImage } from '@/utils/getRandomImage'
import getRandomPrice from '@/utils/getRandomPrice'

interface PopulateRoomProps {
  totalRooms: number
  priceStep: number
  threshold: number
  sliderRange: SliderValue
}

const RoomPopulate = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (room: RoomCreateProps[]) => createRoom(room),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      toast.success('Rooms successfully populated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<PopulateRoomProps>({
    defaultValues: {
      sliderRange: [2000, 8000] as SliderValue,
      threshold: 8,
      priceStep: 250,
      totalRooms: 20,
    },
  })

  const onSubmit = (data: PopulateRoomProps) => {
    const rooms: RoomCreateProps[] = []
    const { sliderRange, priceStep, totalRooms } = data

    let sliderMin: number, sliderMax: number

    if (Array.isArray(sliderRange)) {
      ;[sliderMin, sliderMax] = sliderRange
    } else {
      sliderMin = sliderMax = sliderRange as number
    }

    for (let i = 0; i < totalRooms; i++) {
      const room: RoomCreateProps = {
        name: incrementNumber({ increment: i }),
        price: getRandomPrice(sliderMin, sliderMax, priceStep),
        image: getRandomImage(),
      }

      rooms.push(room)
    }

    mutate(rooms)
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
        Populate rooms
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Populate rooms
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit((data) => {
                    onSubmit(data)
                    onClose()
                  })}
                >
                  <Controller
                    control={control}
                    name="totalRooms"
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        description="Total number of rooms to populate."
                        errorMessage={errors.totalRooms?.message}
                        label="Total rooms"
                        type="number"
                        value={field.value.toString()}
                      />
                    )}
                    rules={{ required: 'This field is required' }}
                  />
                  <Controller
                    control={control}
                    name="threshold"
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        description="Threshold value of room names."
                        errorMessage={errors.threshold?.message}
                        label="Threshold"
                        type="number"
                        value={field.value.toString()}
                      />
                    )}
                    rules={{ required: 'This field is required' }}
                  />
                  <Controller
                    control={control}
                    name="priceStep"
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        description="Steps for price range."
                        errorMessage={errors.priceStep?.message}
                        label="Steps"
                        type="number"
                        value={field.value.toString()}
                      />
                    )}
                    rules={{ required: 'This field is required' }}
                  />
                  <Controller
                    control={control}
                    name="sliderRange"
                    render={({ field }) => (
                      <div>
                        <Slider
                          {...field}
                          showTooltip
                          formatOptions={{ style: 'currency', currency: 'INR' }}
                          label="Price Range"
                          maxValue={10000}
                          minValue={1000}
                          step={getValues('priceStep')}
                          onChange={field.onChange}
                        />
                        <p>
                          Selected budget:{' '}
                          {Array.isArray(field.value) &&
                            field.value.map((x) => `₹${x}`).join(' – ')}
                        </p>
                      </div>
                    )}
                  />
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

export default RoomPopulate
