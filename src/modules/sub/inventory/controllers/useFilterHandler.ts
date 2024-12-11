import { Dispatch, SetStateAction, useCallback } from 'react'
import { RenderItem } from '../view/filter/Filter'

type UseFilterHandlerPropsType = {
  setType: Dispatch<SetStateAction<string[]>>
  setBrand: Dispatch<SetStateAction<string[]>>
  setBranch: Dispatch<SetStateAction<string[]>>
}

export const useFilterHandler = ({
  setType,
  setBrand,
  setBranch,
}: UseFilterHandlerPropsType) => {
  const onChange = useCallback(
    (
      _value: { value: string; label: React.ReactNode }[],
      option: RenderItem[],
    ) => {
      const branch = option.filter((o) => o.type === 'branch').map((e) => e.id)
      const brand = option.filter((o) => o.type === 'brand').map((e) => e.id)
      const type = option.filter((o) => o.type === 'type').map((e) => e.id)
      setBranch(branch)
      setBrand(brand)
      setType(type)
    },
    [setBranch, setBrand, setType],
  )

  return {
    onChange,
  }
}
