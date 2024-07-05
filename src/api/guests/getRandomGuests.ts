import { GuestCreateProps } from '@/types/guest'

const convertData = (apiData: any[]): GuestCreateProps[] => {
  return apiData.map((item) => {
    const gender = item.gender
    const name = `${item.name.title} ${item.name.first} ${item.name.last}`
    const email = item.email
    const phoneNumber = item.phone.replace(/[^\d]/g, '')
    const dob = new Date(item.dob.date).toISOString()
    const address = `${item.location.street.number} ${item.location.street.name}, ${item.location.city}, ${item.location.state}, ${item.location.country}`

    return {
      gender,
      name,
      email,
      phoneNumber,
      dob,
      address,
    }
  })
}

const getRandomGuests = async (
  totalGuests: number
): Promise<GuestCreateProps[]> => {
  const response = await fetch(
    `https://randomuser.me/api/?results=${totalGuests}`
  )

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }

  const data = await response.json()

  return convertData(data.results)
}

export default getRandomGuests
