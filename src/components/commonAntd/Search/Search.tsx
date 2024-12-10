import { Input } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React from 'react'

const { Search: SearchInput } = Input

type SearchPropsType = {
  loading: boolean
  onSearch: (value: string) => void
  inputProps: {
    placeholder: string
    size: SizeType
  }
  style?: React.CSSProperties
}

const Search = ({
  loading = false,
  onSearch,
  inputProps: { placeholder, size = 'middle' },
  style,
}: SearchPropsType) => {
  return (
    <SearchInput
      placeholder={placeholder}
      loading={loading}
      onSearch={onSearch}
      style={style}
      size={size}
      enterButton
    />
  )
}

export default Search
