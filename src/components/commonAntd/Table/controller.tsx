import { TableProps } from 'antd'
import { TableRef } from 'antd/es/table'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type UseTableScroll = {
  tableRef: RefObject<TableRef>
  scroll: TableProps['scroll']
}

type ScrollX = string | number | true | undefined

const getPaginationHeight = (tableWrapper: HTMLDivElement) => {
  let calculatedHeight = 0

  const paginationElement = tableWrapper.getElementsByClassName(
    'ant-table-pagination',
  )[0]
  if (!paginationElement) return calculatedHeight

  const { height } = paginationElement.getBoundingClientRect()
  const styles = window.getComputedStyle(paginationElement)
  const marginTop = +styles.marginTop.replace('px', '')
  const marginBottom = +styles.marginBottom.replace('px', '')

  calculatedHeight += height + marginTop + marginBottom

  return calculatedHeight
}

export const useTableScroll = (
  scrollX: ScrollX = true,
  stretchByPage: boolean = true,
  delay: number = 50,
): UseTableScroll => {
  const [scrollY, setScrollY] = useState<number | undefined>()
  const tableRef = useRef<TableRef>(null)

  const calcScrollY = () => {
    const tableWrapper = tableRef?.current?.nativeElement
    if (!tableWrapper) return

    const tBody = tableWrapper.getElementsByTagName('tbody')[0]
    if (!tBody) return

    const { y: tBodyY } = tBody.getBoundingClientRect()
    const totalHeight =
      window.innerHeight - tBodyY - getPaginationHeight(tableWrapper) - 35

    setScrollY(totalHeight)
  }

  const debounce = useDebouncedCallback(calcScrollY, delay)

  useEffect(() => {
    debounce()
    window.addEventListener('resize', calcScrollY)

    return () => {
      window.removeEventListener('resize', calcScrollY)
    }
  }, [debounce, tableRef?.current?.nativeElement])

  useEffect(() => {
    if (!stretchByPage) return

    const tableWrapper = tableRef.current?.nativeElement
    if (!tableWrapper) return

    const tableBody = tableWrapper.getElementsByClassName(
      'ant-table-body',
    )[0] as HTMLDivElement
    if (!tableBody) return

    tableBody.style.height = `${scrollY}px`
  }, [scrollY, stretchByPage])

  return { tableRef, scroll: { x: scrollX, y: scrollY } }
}
