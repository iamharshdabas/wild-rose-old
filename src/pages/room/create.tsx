import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
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
import { Slider } from '@nextui-org/slider'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Spinner } from '@nextui-org/spinner'

import incrementNumber from '@/utils/incrementNumber'
import getRandomPrice from '@/utils/getRandomPrice'
import getRandomImage from '@/utils/getRandomImage'
import { RoomCreateProps } from '@/types/room'
import useGetLastRoomQuery from '@/hooks/rooms/useGetLastRoomQuery'
import useCreateRoomMutation from '@/hooks/rooms/useCreateRoomMutation'
import { siteConfig } from '@/utils/site'
import useGetSettingsQuery from '@/hooks/settings/useGetSettingsQuery'

const RoomCreate = () => {
  const queryClient = useQueryClient()
  const { data: lastRoom } = useGetLastRoomQuery()
  const { data: settings, isLoading: isSettingsLoading } = useGetSettingsQuery()
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
    name: incrementNumber({ initial: lastRoom?.name }),
    price: 0,
    bedroom: getRandomImage('bedroom'),
    bathroom: getRandomImage('bathroom'),
  }

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
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
    if (lastRoom && settings) {
      setValue('name', incrementNumber({ initial: lastRoom.name }))
      setValue(
        'price',
        getRandomPrice(settings.priceMin, settings.priceMax, settings.priceStep)
      )
    }
  }, [lastRoom, setValue])

  const onSubmit = (data: RoomCreateProps) => {
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
      <Modal
        isOpen={isOpen}
        scrollBehavior="outside"
        size="3xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">Create Room</ModalHeader>
              {isSettingsLoading ? (
                <Spinner />
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    <div className="space-y-4">
                      <Code size="lg">
                        Threshold: {settings?.roomThreshold}
                      </Code>
                      <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <Input
                            {...field}
                            isRequired
                            description={'Check threshold overflow condition'}
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
                              formatOptions={{
                                style: 'currency',
                                currency: 'INR',
                              }}
                              label="Price"
                              maxValue={settings?.priceMax}
                              minValue={settings?.priceMin}
                              step={settings?.priceStep}
                              tooltipValueFormatOptions={{
                                style: 'currency',
                                currency: 'INR',
                              }}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        )}
                      />
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Controller
                            control={control}
                            name="bedroom"
                            render={({ field }) => (
                              <>
                                <Image
                                  isBlurred
                                  alt="Bedroom image"
                                  height={1024}
                                  src={field.value}
                                  width={1536}
                                />
                                <Button
                                  onPress={() =>
                                    field.onChange(getRandomImage('bedroom'))
                                  }
                                >
                                  Get Random image
                                </Button>
                              </>
                            )}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Controller
                            control={control}
                            name="bathroom"
                            render={({ field }) => (
                              <>
                                <Image
                                  isBlurred
                                  alt="Bathroom image"
                                  height={1024}
                                  src={field.value}
                                  width={1536}
                                />
                                <Button
                                  onPress={() =>
                                    field.onChange(getRandomImage('bathroom'))
                                  }
                                >
                                  Get Random image
                                </Button>
                              </>
                            )}
                          />
                        </div>
                      </div>
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

export default RoomCreate
