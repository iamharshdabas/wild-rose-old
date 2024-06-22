export type RoomProps = {
  id: number
  created_at: string
  name: number
  price: number
  bedroom: string
  bathroom: string
  // NOTE :dont touch this
  actions: string // NOTE: there is no use of actions here, it is here so that i dont have to create multiple types for `Cabin column` and `Cabins keyof`
}

export type RoomColumnProps = keyof RoomProps

export type RoomCreateProps = {
  name: number
  price: number
  bedroom: string
  bathroom: string
}
