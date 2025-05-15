import DownLoadCsv from '@/components/commonAntd/DownLoad/DownLoadCsv'
import Button from '@/components/commonAntd/Button/Button'
import Modal from '@/components/commonAntd/Modal/Modal'
import { dataTemplateCsv, headersTemplateCsv } from '@/constant/csvData'
import { tkeys } from '@/translations/i18n'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { List, message, Typography, Upload } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RcFile } from 'antd/es/upload/interface'
import { useUploadCsvMutation } from '../../../controllers/apiHandler/useUploadCsvMutation'

const { Text } = Typography

type UploadCsvPropsType = {
  modalProps: {
    open: boolean
    handleOK?: () => void
    handleCancel?: () => void
  }
}

interface FileStatus {
  uid: string
  name: string
  status: string
  url?: string
}

const UploadCsv = ({
  modalProps: { open, handleOK, handleCancel },
}: UploadCsvPropsType) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.upload
  const { uploadCSVHandler } = useUploadCsvMutation({
    handleClose: handleCancel,
  })
  const { Dragger } = Upload

  const [fileList, setFileList] = useState<FileStatus[]>([])
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    accept: '.csv',
    beforeUpload: async (file: RcFile) => {
      const newFile: FileStatus = {
        uid: file.name,
        name: file.name,
        status: 'uploading',
      }
      setFileList((prev) => [...prev, newFile])
      try {
        uploadCSVHandler(file)
        const success = true
        const msg = 'Upload success'
        const url = 'https://www.google.com'

        if (success) {
          setFileList((prev) =>
            prev.map((f) =>
              f.uid === file.uid ? { ...f, status: 'done', url } : f,
            ),
          )
          message.success(`${file.name} uploaded successfully.`)
        } else {
          setFileList((prev) =>
            prev.map((f) =>
              f.uid === file.uid ? { ...f, status: 'error' } : f,
            ),
          )
          message.error(`${file.name} upload failed. ${msg}`)
        }
      } catch (error) {
        setFileList((prev) =>
          prev.map((f) => (f.uid === file.uid ? { ...f, status: 'error' } : f)),
        )
        console.error(error)
        message.error(`${file.name} upload failed.`)
      }
      return false
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <>
      <Modal
        title={trans(keys.header.lable)}
        open={open}
        handleOk={handleOK}
        handleCancel={handleCancel}
        contentRender={() => {
          return (
            <div className="w-full pb-[0px]">
              <p className="text-secondary m-0 px-[0px] text-base">
                {trans(keys.header.sub)}
              </p>
              <div className="mt-[10px] px-0 w-full flexs justify-centerd">
                <>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </p>
                  </Dragger>
                  <List
                    itemLayout="horizontal"
                    dataSource={fileList}
                    renderItem={(item) => (
                      <List.Item>
                        <Text>
                          {item.name} -{' '}
                          {item.status === 'done' ? (
                            <Text type="success">Uploaded</Text>
                          ) : item.status === 'uploading' ? (
                            <Text type="warning">Uploading...</Text>
                          ) : (
                            <Text type="danger">Failed</Text>
                          )}
                        </Text>
                      </List.Item>
                    )}
                  />
                </>
              </div>
            </div>
          )
        }}
        footerRender={() => (
          <>
            <DownLoadCsv
              data={dataTemplateCsv}
              headers={headersTemplateCsv}
              contents={() => {
                return (
                  <Button
                    className="!h-[40px] !w-[100%] !normal-case !mr-[16px] !no-underline"
                    label={trans(tkeys.common.button.downloadTemp)}
                    color={'primary'}
                    variant="outlined"
                    onClick={() => {}}
                  />
                )
              }}
            />
          </>
        )}
      />
    </>
  )
}

export default UploadCsv
