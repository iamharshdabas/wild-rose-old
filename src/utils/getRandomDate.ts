const getRandomDate = (): Date => {
  const currentYear = new Date().getFullYear()
  const start = new Date(currentYear, 0, 1).getTime()
  const end = new Date(currentYear, 11, 31).getTime()

  const randomTimestamp = start + Math.random() * (end - start)

  const randomDate = new Date(randomTimestamp)

  return randomDate
}

export default getRandomDate
