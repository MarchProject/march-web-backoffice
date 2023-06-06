import { size } from "lodash"

export const onlyNumber = (val: string): boolean => {
  return /^(\d*)?$/g.test(val)
}

export const max =
  (maximum: number) =>
  (val: string): boolean => {
    return size(val) <= maximum
  }
