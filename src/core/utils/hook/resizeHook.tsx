import { useCallback, useEffect, useState } from 'react'

export const useResize = (id?: string) => {
  const [gridHeight, setGridHeight] = useState(0)
  let navbarHeight = 0
  const windowHeight = window.innerHeight
  const handleResize = useCallback(() => {
    let navbarHeight = 0
    if (id) {
      navbarHeight = document.getElementById(id)?.offsetHeight
    }
    const availableHeight = windowHeight - 125 - navbarHeight
    setGridHeight(availableHeight)
  }, [id, windowHeight])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [id, handleResize])
  return gridHeight < 500 ? windowHeight - navbarHeight - 125 : gridHeight
}
