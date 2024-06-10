export type CabinProps = {
  id: number
  created_at: string
  name: string
  price: number
}

export type CabinColumnProps = {
  key: keyof CabinProps
  label: string
}
