import { useEffect, useState } from 'react'

export const useResize = (id?: string) => {
  const [gridHeight, setGridHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      let navbarHeight = 0
      const windowHeight = window.innerHeight
      if (id) {
        navbarHeight = document.getElementById(id)?.offsetHeight
      }
      //   const
      const availableHeight = windowHeight - 125- navbarHeight
      setGridHeight(availableHeight)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [id])
  return gridHeight
}
