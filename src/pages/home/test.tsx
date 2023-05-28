import React from 'react'

export default function Formatter({ text, value, config }) {
  function formatNumber(number) {
    if (number === 0) {
      return '0'
    }

    const suffixes = ['', 'K', 'M']
    let suffixIndex: number = 0

    while (number >= 1000 && suffixIndex < suffixes.length - 1) {
      number /= 1000
      suffixIndex++
    }
    number = number.toFixed(1)

    if (number.slice(-2) === '.0') {
      number = number.slice(0, -2)
    }
    return number + suffixes[suffixIndex]
  }

  const { maxTextLength, showUnFormatted } = config

  function maxLength(maxTextLength) {}
  return (
    <>
      <h2>
        {text} {value} {}
      </h2>
    </>
  )
}
