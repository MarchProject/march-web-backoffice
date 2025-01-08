export const validateExpiryDate = (expiryDate: string) => {
  const pattern = /^\d{2}-\d{2}-\d{4}$/

  if (!pattern.test(expiryDate)) {
    return false
  }

  const parts = expiryDate.split('-')
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const year = parseInt(parts[2], 10)

  // Validate the day, month, and year values
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false // One or more components are not numeric
  }

  // Validate the range of day, month, and year values
  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1000 ||
    year > 9999
  ) {
    return false // One or more components are out of range
  }

  // Check if it's a leap year
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

  // Validate the day value for February
  if (
    month === 2 &&
    (day < 1 || (isLeapYear && day > 29) || (!isLeapYear && day > 28))
  ) {
    return false // Invalid day for February
  }

  // Get the current date
  const currentDate = new Date()

  // Create a new date object using the provided expiryDate
  const expiryDateObj = new Date(year, month - 1, day)

  // Compare the expiryDate with the current date
  if (expiryDateObj <= currentDate) {
    return false // The expiryDate is not in the future
  }

  return true // The expiryDate is valid and in the future
}
