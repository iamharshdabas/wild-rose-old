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
import { Slider, SliderValue } from '@nextui-org/slider'
import { useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { cn } from '@nextui-org/theme'
import { Spinner } from '@nextui-org/spinner'

import incrementNumber from '@/utils/incrementNumber'
import getRandomPrice from '@/utils/getRandomPrice'
import getRandomImage from '@/utils/getRandomImage'
import { RoomCreateProps } from '@/types/room'
import { siteConfig } from '@/utils/site'
import useCreateRoomMutation from '@/hooks/rooms/useCreateRoomMutation'
import { subtitle } from '@/utils/primitives'
import useGetSettingsQuery from '@/hooks/settings/useGetSettingsQuery'

interface PopulateRoomProps {
  totalRooms: number
  sliderRange: SliderValue
}

const RoomPopulate = () => {
  const queryClient = useQueryClient()
  const { data: settings, isLoading: isSettingsLoading } = useGetSettingsQuery()
  const { mutate, isPending } = useCreateRoomMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [siteConfig.queryKey.rooms] })
    },
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PopulateRoomProps>({
    defaultValues: {
      totalRooms: 20,
      sliderRange: [0, 0],
    },
  })

  const onSubmit = (data: PopulateRoomProps) => {
    const rooms: RoomCreateProps[] = []
    const { sliderRange, totalRooms } = data

    let sliderMin: number, sliderMax: number

    if (Array.isArray(sliderRange)) {
      ;[sliderMin, sliderMax] = sliderRange
    } else {
      sliderMin = sliderMax = sliderRange as number
    }

    if (settings) {
      for (let i = 0; i < totalRooms; i++) {
        const room: RoomCreateProps = {
          name: incrementNumber({
            initial: 1,
            increment: i,
            threshold: settings?.roomThreshold,
          }),
          price: getRandomPrice(sliderMin, sliderMax, settings?.priceStep),
          bathroom: getRandomImage('bathroom'),
          bedroom: getRandomImage('bedroom'),
        }

        rooms.push(room)
      }
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
              <ModalHeader className="flex flex-col">
                Populate rooms
                <span className={cn(subtitle(), 'text-danger')}>
                  Only use this if there are no rooms inside the database
                </span>
              </ModalHeader>
              {isSettingsLoading ? (
                <Spinner />
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
                      name="totalRooms"
                      render={({ field }) => (
                        <Input
                          {...field}
                          isRequired
                          description="Total number of rooms to populate."
                          errorMessage={errors.totalRooms?.message}
                          label="Total rooms"
                          type="number"
                          value={field.value?.toString()}
                        />
                      )}
                      rules={{ required: 'This field is required' }}
                    />
                    <Input
                      isDisabled
                      isRequired
                      description="Change through Settings page."
                      label="Threshold"
                      type="number"
                      value={settings?.roomThreshold.toString()}
                    />
                    <Input
                      isDisabled
                      isRequired
                      description="Change through Settings page."
                      label="Steps"
                      type="number"
                      value={settings?.priceStep.toString()}
                    />
                    <Controller
                      control={control}
                      name="sliderRange"
                      render={({ field }) => (
                        <div>
                          <Slider
                            {...field}
                            showTooltip
                            formatOptions={{
                              style: 'currency',
                              currency: 'INR',
                            }}
                            label="Price Range"
                            maxValue={settings?.priceMax}
                            minValue={settings?.priceMin}
                            step={settings?.priceStep}
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

export default RoomPopulate
