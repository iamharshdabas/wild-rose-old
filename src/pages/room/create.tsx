import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@nextui-org/button'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { Slider } from '@nextui-org/slider'
import { useRef, useState } from 'react'
import { Image } from '@nextui-org/image'

import { RoomCreateProps } from '@/types/room'
import { getRandomImage } from '@/config/images'

export default function RoomCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCreateProps>()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const sliderValueRef = useRef(1500)
  const [imageSrc, setImageSrc] = useState(getRandomImage())

  const onSubmit: SubmitHandler<RoomCreateProps> = (data) => {
    const room: RoomCreateProps = {
      name: data.name,
      price: sliderValueRef.current,
      image: imageSrc,
    }

    console.log(room)
  }

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
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    isRequired
                    errorMessage="This field is required"
                    isInvalid={Boolean(errors.name)}
                    label="Name"
                    type="text"
                    {...register('name', { required: true })}
                  />
                  <div>
                    <Slider
                      showTooltip
                      defaultValue={sliderValueRef.current}
                      formatOptions={{ style: 'currency', currency: 'USD' }}
                      label="Price"
                      maxValue={2000}
                      minValue={1000}
                      step={25}
                      tooltipValueFormatOptions={{
                        style: 'currency',
                        currency: 'USD',
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
                    <Button onClick={handleImageChange}>
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
                    <Button color="primary" type="submit">
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
