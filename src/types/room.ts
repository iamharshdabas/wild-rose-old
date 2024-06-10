export type RoomsProps = {
  image: string
  id: number
  created_at: string
  name: string
  price: number
  // NOTE :dont touch this
  actions: string // NOTE: there is no use of actions here, it is here so that i dont have to create multiple types for `Cabin column` and `Cabins keyof`
}

export type RoomsColumnProps = keyof RoomsProps
