export function formatBankNo(val: string) {
  if (val && val.length === 10) {
    const first = val.substring(0, 3) || ''
    const second = val.substring(3, 4) || ''
    const thrid = val.substring(4, 9) || ''
    const fourth = val.substring(9, 10) || ''

    return (
      first +
      (second !== '' ? '-' + second : '') +
      (thrid !== '' ? '-' + thrid : '') +
      (fourth !== '' ? '-' + fourth : '')
    )
  }
  return val || ''
}
