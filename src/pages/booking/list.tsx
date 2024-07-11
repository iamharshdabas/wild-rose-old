import { Chip } from '@nextui-org/chip'
import { Code } from '@nextui-org/code'
import { Spinner } from '@nextui-org/spinner'
import { cn } from '@nextui-org/theme'
import { ArrowRight, IndianRupee } from 'lucide-react'
import { useCallback } from 'react'

import RoomShow from '../room/show'
import GuestShow from '../guest/show'

import BookingPopulate from './populate'

import DataTable from '@/components/data-table'
import useGetBookingsQuery from '@/hooks/bookings/useGetBookingsQuery'
import { BookingColumnProps, BookingProps } from '@/types/booking'
import formatDate from '@/utils/formatDate'
import { subtitle, title } from '@/utils/primitives'

const BookingList = () => {
  const { data = [], isLoading } = useGetBookingsQuery()

  const columns: {
    key: BookingColumnProps
    label: string
    // BUG: remove useMemo from other columns to fix types
  }[] = [
    { key: 'guestName', label: 'Name' },
    { key: 'roomName', label: 'Room' },
    { key: 'totalNights', label: 'Nights' },
    { key: 'price', label: 'Price' },
    { key: 'paid', label: 'Paid' },
    { key: 'status', label: 'Status' },
    // TODO: { key: 'actions', label: 'Actions' },
  ]

  const renderCell = useCallback(
    (booking: BookingProps, columnKey: BookingColumnProps) => {
      const cellValue = booking[columnKey]

      switch (columnKey) {
        case 'guestName':
          return (
            <div className="flex justify-center">
              <GuestShow id={booking.guestID} title={cellValue.toString()} />
            </div>
          )
        case 'roomName':
          return (
            <div className="flex justify-center">
              <RoomShow id={booking.roomID} title={cellValue.toString()} />
            </div>
          )
        case 'totalNights':
          return (
            <div
              className={cn(
                subtitle(),
                'flex flex-col items-center gap-2 py-2'
              )}
            >
              <div className="flex items-center gap-4">
                <h2>{formatDate(booking.startDate)}</h2>
                <ArrowRight size={20} /> <h2>{formatDate(booking.endDate)}</h2>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Code>{cellValue}</Code>
                <span>nights</span>
                <span>for</span>
                <Code>{booking.totalGuests}</Code>
                <span>guest{booking.totalGuests !== 1 && 's'}</span>
              </div>
            </div>
          )
        case 'price':
          return (
            <div className="flex items-center justify-center gap-2">
              <IndianRupee size={16} />
              <span>{Number(cellValue) * booking.totalNights}</span>
            </div>
          )
        case 'paid':
          return (
            <div className="flex justify-center">
              <Chip
                color={cellValue === false ? 'warning' : 'success'}
                size="lg"
                variant="dot"
              >
                {cellValue === false ? 'unpaid' : 'paid'}
              </Chip>
            </div>
          )
        case 'status':
          return (
            <div className="flex justify-center">
              <Chip
                color={
                  cellValue === 'checked-out'
                    ? 'success'
                    : cellValue === 'checked-in'
                      ? 'primary'
                      : 'warning'
                }
                size="lg"
                variant="dot"
              >
                {cellValue}
              </Chip>
            </div>
          )
        //  TODO: case 'actions':
        //   return (
        //     <>
        //       <div className="relative flex items-center justify-center gap-2">
        //         {/* <BookingShow id={booking.id} /> */}
        //       </div>
        //     </>
        //   )
        default:
          return cellValue
      }
    },
    []
  )

  return (
    <>
      <div className="w-full max-w-7xl text-center">
        <h1 className={title()}>Bookings</h1>
      </div>
      <div className="w-full max-w-7xl pb-16 text-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            populateComponent={<BookingPopulate />}
            renderCell={renderCell}
            toFilter={'guestName'}
          />
        )}
      </div>
    </>
  )
}

export default BookingList
