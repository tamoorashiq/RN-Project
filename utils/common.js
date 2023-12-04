export const validateEmail = email => {
  // Regular expression pattern for validating email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // Test the email against the pattern
  return emailPattern.test(email)
}

export const validatePassword = password => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, and 1 lowercase letter"
  }

  return null
}
