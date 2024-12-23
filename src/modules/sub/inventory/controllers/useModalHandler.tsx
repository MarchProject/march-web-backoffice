import { useState, useCallback } from 'react'

export const useModalHandler = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOK = useCallback(() => {
    setOpen(false)
  }, [])

  const handleCancel = useCallback(() => {
    setOpen(false)
  }, [])

  return {
    open,
    handleOpen,
    handleOK,
    handleCancel,
  }
}
