import { useLoadingContext } from '@/context/loading'
import { useEffect } from 'react'

export const useLoadingHandler = (loading: boolean) => {
  const { openLoading, closeLoading } = useLoadingContext()

  useEffect(() => {
    if (loading) {
      openLoading()
    } else {
      closeLoading()
    }
  }, [closeLoading, loading, openLoading])
}
