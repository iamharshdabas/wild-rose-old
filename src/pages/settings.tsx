import { Input } from '@nextui-org/input'
import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { Spinner } from '@nextui-org/spinner'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@nextui-org/button'
import { House, IndianRupee } from 'lucide-react'

import { title } from '@/config/primitives'
import { SettingsProps } from '@/types/settings'
import { siteConfig } from '@/config/site'
import useGetSettingsQuery from '@/hooks/settings/useGetSettingsQuery'
import useUpdateSettingsMutation from '@/hooks/settings/useUpdateSettingsMutation'

const Settings = () => {
  const queryClient = useQueryClient()
  const { data: settings, isLoading } = useGetSettingsQuery()

  const { mutate } = useUpdateSettingsMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [siteConfig.queryKey.settings],
      })
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SettingsProps>()

  useEffect(() => {
    if (settings) {
      setValue('priceStep', settings.priceStep)
      setValue('priceMin', settings.priceMin)
      setValue('priceMax', settings.priceMax)
      setValue('roomThreshold', settings.roomThreshold)
    }
  }, [settings, setValue])

  return (
    <>
      <div className="w-full max-w-7xl text-center">
        <h1 className={title()}>Settings</h1>
      </div>
      <div className="w-full max-w-xl pb-16">
        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit((data: SettingsProps) => mutate(data))}>
            <Controller
              control={control}
              name="priceStep"
              render={({ field }) => (
                <Input
                  {...field}
                  isRequired
                  className="flex justify-between py-4"
                  errorMessage={errors.priceStep?.message}
                  label="Price Step"
                  labelPlacement="outside-left"
                  startContent={<IndianRupee />}
                  type="number"
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
              rules={{ required: 'This field is required' }}
            />
            <Controller
              control={control}
              name="priceMin"
              render={({ field }) => (
                <Input
                  {...field}
                  isRequired
                  className="flex justify-between py-4"
                  errorMessage={errors.priceMin?.message}
                  label="Minimum price"
                  labelPlacement="outside-left"
                  startContent={<IndianRupee />}
                  type="number"
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
              rules={{ required: 'This field is required' }}
            />
            <Controller
              control={control}
              name="priceMax"
              render={({ field }) => (
                <Input
                  {...field}
                  isRequired
                  className="flex justify-between py-4"
                  errorMessage={errors.priceMax?.message}
                  label="Maximum price"
                  labelPlacement="outside-left"
                  startContent={<IndianRupee />}
                  type="number"
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
              rules={{ required: 'This field is required' }}
            />
            <Controller
              control={control}
              name="roomThreshold"
              render={({ field }) => (
                <Input
                  {...field}
                  isRequired
                  className="flex justify-between py-4"
                  errorMessage={errors.roomThreshold?.message}
                  label="Room threshold"
                  labelPlacement="outside-left"
                  startContent={<House />}
                  type="number"
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
              rules={{ required: 'This field is required' }}
            />
            <div className="flex justify-center py-4">
              <Button className="w-full" type="submit" variant="ghost">
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default Settings
