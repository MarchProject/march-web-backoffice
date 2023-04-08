export function formatNumber(value: number, point?: number): string {
  if (!value) {
    return '0.00'
  }

  return (
    value
      //
      .toFixed(point ?? 2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,') || '0.00'
  )
}

export function formatFloat(value: string) {
  if (!value) {
    return '0'
  }

  // let _value = value
  // if (/\.\d$/.test(value)) {
  //   _value = `${value}0`
  // }

  const _value = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // .replace(/\.(?=\d{0,2}$)/g, '.')
  // console.log('formatFloat', { _value })
  return _value
}

export function formatInteger(value: string) {
  if (!value) {
    return '0'
  }

  const _value = `${value}`
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .replace(/(\.[0-9]*?)/g, '')

  return _value
}

export function parseNumber(value: string): number {
  if (!value) {
    return 0
  }

  let _value = value
  if (typeof value !== 'string') {
    _value = `${value}`
  }

  return parseFloat(_value.replace(/,/g, '')) || 0
}

export default {
  formatNumber,
  formatFloat: formatFloat,
  parseNumber,
}
