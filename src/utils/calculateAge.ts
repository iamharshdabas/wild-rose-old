const calculateAge = (birthdate: string): number => {
  const birthDate = new Date(birthdate)
  const currentDate = new Date()

  let age = currentDate.getFullYear() - birthDate.getFullYear()

  // Adjust age if birthday has not occurred yet this year
  if (
    currentDate <
    new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    )
  ) {
    age--
  }

  return age
}

export default calculateAge
