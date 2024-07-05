import { Spinner } from '@nextui-org/spinner'
import { useCallback, useMemo } from 'react'
import { cn } from '@nextui-org/theme'
import { Code } from '@nextui-org/code'
import { Button } from '@nextui-org/button'
import { Copy } from 'lucide-react'

import GuestPopulate from './populate'
import GuestShow from './show'

import { subtitle, title } from '@/config/primitives'
import formatDate from '@/utils/formatDate'
import DataTable from '@/components/data-table'
import useGetGuestsQuery from '@/hooks/guests/useGetGuestsQuery'
import { GuestColumnProps, GuestProps } from '@/types/guest'
import copyToClipboard from '@/utils/copyToClipboard'

const GuestList = () => {
  const { data = [], isLoading } = useGetGuestsQuery()

  const columns: {
    key: GuestColumnProps
    label: string
  }[] = useMemo(
    () => [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phoneNumber', label: 'Phone Number' },
      { key: 'dob', label: 'DOB' },
      { key: 'address', label: 'Address' },
      { key: 'actions', label: 'Actions' },
    ],
    []
  )

  const renderCell = useCallback(
    (guests: GuestProps, columnKey: GuestColumnProps) => {
      const cellValue = guests[columnKey]

      switch (columnKey) {
        case 'name':
          return <h2 className={cn(subtitle(), 'text-center')}>{cellValue}</h2>
        case 'email':
          return (
            <div className="items-center-center flex justify-between gap-2">
              <Code size="md">{cellValue}</Code>
              <Button
                isIconOnly
                size="sm"
                onPress={() => copyToClipboard(cellValue.toString())}
              >
                <Copy />
              </Button>
            </div>
          )
        case 'phoneNumber':
          return (
            <div className="items-center-center flex justify-between gap-2">
              <Code size="md">{cellValue}</Code>
              <Button
                isIconOnly
                size="sm"
                onPress={() => copyToClipboard(cellValue.toString())}
              >
                <Copy />
              </Button>
            </div>
          )
        case 'dob':
          return (
            <h2 className={cn(subtitle(), 'text-center')}>
              {formatDate(cellValue.toString())}
            </h2>
          )
        case 'address':
          return <h2 className={cn(subtitle(), 'text-center')}>{cellValue}</h2>
        case 'actions':
          return (
            <>
              <div className="relative flex items-center justify-center gap-2">
                <GuestShow id={guests.id} />
              </div>
            </>
          )
        default:
          return cellValue
      }
    },
    []
  )

  return (
    <>
      <div className="w-full max-w-7xl text-center">
        <h1 className={title()}>Guests</h1>
      </div>
      <div className="w-full max-w-7xl pb-16 text-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            populateComponent={<GuestPopulate />}
            renderCell={renderCell}
            toFilter={'name'}
          />
        )}
      </div>
    </>
  )
}

export default GuestList
