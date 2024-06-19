const padNumberWithLeadingZeros = (number: number, length: number) => {
  return number.toString().padStart(length, '0')
}

const calculateThresholdIncrements = (
  initial: number,
  increment: number,
  threshold: number
) => {
  return Math.floor((initial + increment - 1) / threshold)
}

const incrementNumber = ({ initial = 1, increment = 1, threshold = 8 }) => {
  const inputString = initial.toString()
  let number = initial + increment
  const firstDigit = calculateThresholdIncrements(initial, increment, threshold)

  const thresholdOverflow =
    parseInt(inputString.slice(-threshold.toString().length), 10) > threshold

  if (number > threshold && thresholdOverflow) {
    number = number % threshold

    if (number === 0) {
      number = threshold
    }

    number = parseInt(
      `${firstDigit}${padNumberWithLeadingZeros(
        number,
        Math.max(inputString.length, 2)
      )}`
    )
  }

  return number
}

export default incrementNumber
