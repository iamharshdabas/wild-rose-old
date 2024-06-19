const getRandomPrice = (min: number, max: number, step: number) => {
  min = Math.ceil(min / step) * step // Ensure min is a multiple of step
  const range = (max - min) / step + 1
  const randomIndex = Math.floor(Math.random() * range)

  return min + randomIndex * step
}

export default getRandomPrice
