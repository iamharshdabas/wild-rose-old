export type GuestProps = {
  id: number
  created_at: string
  gender: string
  name: string
  email: string
  phoneNumber: number
  dob: string
  address: string
  // NOTE :dont touch this
  actions: string // NOTE: there is no use of actions here, it is here so that i dont have to create multiple types for `Cabin column` and `Cabins keyof`
}

export type GuestColumnProps = keyof GuestProps

export type GuestCreateProps = {
  gender: string
  name: string
  email: string
  phoneNumber: number
  dob: string
  address: string
}
