import React from 'react'
import { Modal as ModalAntd } from 'antd'

type ModalPropsType = {
  title: string
  open: boolean
  handleOk: () => void
  handleCancel: () => void
  loading?: boolean
  contentRender: () => JSX.Element
  footerRender: () => JSX.Element
  width?: number
}

const Modal = ({
  title,
  open,
  handleOk,
  handleCancel,
  loading = false,
  contentRender,
  footerRender,
  width,
}: ModalPropsType) => {
  return (
    <>
      <ModalAntd
        loading={loading}
        open={open}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        width={width}
        footer={footerRender}>
        {contentRender()}
      </ModalAntd>
    </>
  )
}

export default Modal
