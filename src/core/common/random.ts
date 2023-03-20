export function randomChars(length = 3) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export function randomNumerics(length = 13) {
  let result = ''
  const characters = '0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}
