// FIX: you know this is broken. how many times are you gonna fix it ?

const padNumberWithLeadingZeros = (number: number, length: number) => {
  return number.toString().padStart(length, '0')
}

const calculateThresholdIncrement = (
  inputString: string,
  firstDigit: number,
  number: number,
  threshold: number
) => {
  number = number % threshold

  if (number === 0) {
    number = threshold
  }

  return parseInt(
    `${firstDigit}${padNumberWithLeadingZeros(
      number,
      Math.max(inputString.length, 2)
    )}`,
    10
  )
}

const incrementNumber = ({ initial = 0, increment = 1, threshold = 4 }) => {
  const inputString = initial.toString()
  let number = initial + increment
  const firstDigit = Math.floor((initial + increment - 1) / threshold)

  if (inputString.length > 1) {
    const thresholdOverflow = parseInt(inputString.slice(1), 10) > threshold

    if (number > threshold && thresholdOverflow) {
      number = calculateThresholdIncrement(
        inputString,
        firstDigit,
        number,
        threshold
      )
    }
  } else if (number > threshold) {
    number = calculateThresholdIncrement(
      inputString,
      firstDigit,
      number,
      threshold
    )
  }

  return parseInt(number.toString(), 10) // NOTE: if threshold is reached. number is converted to string for formatting.
}

export default incrementNumber
