import Papa, { ParseResult } from 'papaparse'
import React, { useRef, useState } from 'react'
import { BiCloudUpload } from 'react-icons/bi'
import { noop } from '@/utils/common/noop'
import { useNotificationContext } from '@/context/notification'
import {
  notificationTypeErrorProp,
  notificationFileSizeErrorProp,
  notificationMultiErrorProp,
} from './notification'

interface IUploadCsv<T> {
  onCompleteValueObj: (result: ParseResult<T>, file: File) => void
  onChangeFile: (value: File[]) => void
}

export const styleIconUpload: React.CSSProperties = {
  color: '#9A73B5',
  padding: '4px',
  borderRadius: '4px',
  marginTop: 'auto',
  marginBottom: 'auto',
  fontSize: '42px',
}

export const UploadCsv = <T extends object>({
  onCompleteValueObj,
  onChangeFile = noop,
}: IUploadCsv<T>) => {
  const { notification } = useNotificationContext()
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)
  const [key, setKey] = useState(0)

  const handleKey = () => {
    setKey((prevKey) => prevKey + 1)
  }
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateUploadFiles = (files: File[]) => {
    const type = files.some((e) => e.type !== 'text/csv')
    const size = files.some((e) => e.size > 4096)
    handleKey()
    if (type) {
      notification(notificationTypeErrorProp)
      return
    }
    if (size) {
      notification(notificationFileSizeErrorProp)
      return
    }
    if (files.length > 4) {
      notification(notificationMultiErrorProp)
      return
    }
    onChangeFile(files)
    files.forEach((file) => {
      convertToBase64(file)
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files[0]
    const files = Array.from(event.target.files)
    validateUploadFiles(files)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = Array.from(e.dataTransfer.files)
    validateUploadFiles(files)
  }

  const convertToBase64 = (file: File) => {
    if (file) {
      Papa.parse(file, {
        complete: onCompleteValueObj,
        skipEmptyLines: true,
        header: true,
      })
    }
  }

  return (
    <div
      className="mt-[20px] cursor-pointer px-[24px]"
      onClick={() => inputRef.current.click()}
      onDragEnter={handleDrag}
      onDrop={handleDrop}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}>
      <div
        className={`rounded-lg border-dashed border-2 border-primary100 mx-auto h-[200px] ${
          dragActive ? 'bg-violet-200' : 'bg-violet-100'
        }`}>
        <div className="mt-[30px] flex justify-center">
          <div className="text-center m-auto">
            <BiCloudUpload style={styleIconUpload} />
            <p className="text-primary m-0 text-xl">
              Drag & drop your CSV here
            </p>
            <p className="text-secondary">or, click to browse (4MB max)</p>
          </div>
        </div>
      </div>
      <input
        key={key}
        ref={inputRef}
        accept=".csv"
        id="csv-upload"
        type="file"
        multiple={true}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  )
}
