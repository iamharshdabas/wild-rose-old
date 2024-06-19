import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Button } from '@nextui-org/button'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal'
import { Slider, SliderValue } from '@nextui-org/slider'
import { Input } from '@nextui-org/input'
import { useState } from 'react'

import { getRandomImage } from '../getRandomImage'
import incrementString from '../incrementString'
import getRandomPrice from '../getRandomPrice'

import { RoomCreateProps } from '@/types/room'
import { createRoom } from '@/api/room'

const PopulateRooms = () => {
  const queryClient = useQueryClient()
  const [sliderRange, setSliderRange] = useState<SliderValue>([2000, 8000])
  const [threshold, setThreshold] = useState('8')
  const [step, setStep] = useState('250')
  const [total, setTotal] = useState('40')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { mutate } = useMutation({
    mutationFn: (room: RoomCreateProps[]) => createRoom(room),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      toast.success('Rooms successfully populated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const populate = () => {
    const rooms: RoomCreateProps[] = []

    let sliderMin: number, sliderMax: number

    if (Array.isArray(sliderRange)) {
      ;[sliderMin, sliderMax] = sliderRange
    } else {
      sliderMin = sliderMax = sliderRange as number
    }

    for (let i = 0; i < parseInt(total, 10); i++) {
      const room: RoomCreateProps = {
        name: incrementString(0, i + 1, 8),
        price: getRandomPrice(sliderMin, sliderMax, parseInt(step, 10)),
        image: getRandomImage(),
      }

      rooms.push(room)
    }

    mutate(rooms)
  }

  return (
    <>
      <Button variant="ghost" onPress={onOpen}>
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
                <form>
                  <Input
                    isRequired
                    description="Total number of rooms to populate."
                    errorMessage="This field is required"
                    label="Total rooms"
                    type="number"
                    value={total}
                    onValueChange={setTotal}
                  />
                  <Input
                    isRequired
                    description="Threshold value of room names."
                    errorMessage="This field is required"
                    label="Threshold"
                    type="number"
                    value={threshold}
                    onValueChange={setThreshold}
                  />
                  <Input
                    isRequired
                    description="Steps for price range."
                    errorMessage="This field is required"
                    label="Steps"
                    type="number"
                    value={step}
                    onValueChange={setStep}
                  />
                  <div>
                    <Slider
                      defaultValue={[2000, 4000]}
                      formatOptions={{ style: 'currency', currency: 'USD' }}
                      label="Price Range"
                      maxValue={10000}
                      minValue={1000}
                      step={parseInt(step, 10)}
                      value={sliderRange}
                      onChange={setSliderRange}
                    />
                    <p>
                      Selected budget:{' '}
                      {Array.isArray(sliderRange) &&
                        sliderRange.map((x) => `$${x}`).join(' – ')}
                    </p>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    populate()
                    onClose()
                  }}
                >
                  Populate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default PopulateRooms
