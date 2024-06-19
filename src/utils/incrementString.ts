const padNumberWithLeadingZeros = (number: number, length: number) => {
  return number.toString().padStart(length, '0')
}

const incrementString = (
  inputNumber: number,
  incrementValue: number,
  threshold: number
) => {
  const inputString = inputNumber.toString()
  let number = inputNumber + incrementValue
  let nextDigitIncrement = 1

  if (number > threshold) {
    const thresholdIncrement = incrementValue - threshold

    if (thresholdIncrement > threshold) {
      number = incrementValue % threshold
      nextDigitIncrement = Math.floor(incrementValue / threshold)
      if (number === 0) {
        number = threshold
        nextDigitIncrement -= 1
      }
    } else {
      number = thresholdIncrement
    }

    const nextDigit = parseInt(inputString.charAt(0), 10) + nextDigitIncrement

    return `${nextDigit}${padNumberWithLeadingZeros(
      number,
      Math.max(inputString.length - 1, 2)
    )}`
  }

  return number.toString()
}

export default incrementString
