import { buddhistEra, dateTimeFormat } from '@/core/common'
import dayjs from '@/core/common/dayjs'
import { GetBranchsInventoryType } from '@/core/gql/inventory/getBranchsInventoryQuery'
import { tkeys } from '@/translations/i18n'
import {
  Form,
  GetRef,
  Input,
  InputRef,
  Popconfirm,
  TableColumnsType,
} from 'antd'
import React, { useState, useRef, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type UseBranchModalControllerPropsType<T> = {
  updateHandle: (data: {
    id?: string
    name: string
    description?: string
  }) => void
  data: T[]
  deleteHandle: (id: string) => void
}

export type ColumnTypes = Exclude<
  TableColumnsType<GetBranchsInventoryType>,
  undefined
>

type FormInstance<T> = GetRef<typeof Form<T>>

const EditableContext = React.createContext<FormInstance<any> | null>(null)

export const useBranchModalController = <T extends any>({
  updateHandle,
  data,
  deleteHandle,
}: UseBranchModalControllerPropsType<T>) => {
  const { t: trans } = useTranslation()

  interface EditableRowProps {
    index: number
  }

  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm()
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    )
  }

  interface EditableCellProps {
    title: React.ReactNode
    editable: boolean
    dataIndex: keyof GetBranchsInventoryType
    record: GetBranchsInventoryType
    handleSave: (record: GetBranchsInventoryType) => void
  }

  const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false)
    const inputRef = useRef<InputRef>(null)
    const form = useContext(EditableContext)!

    useEffect(() => {
      if (editing) {
        inputRef.current?.focus()
      }
    }, [editing])

    const toggleEdit = () => {
      setEditing(!editing)
      form.setFieldsValue({ [dataIndex]: record[dataIndex] })
    }

    const save = async () => {
      try {
        const values = await form.validateFields()
        toggleEdit()
        handleSave({ ...record, ...values })
      } catch (errInfo) {
        // console.log('Save failed:', errInfo)
      }
    }

    let childNode = children

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: dataIndex === 'name',
              message: `${title} is required.`,
            },
          ]}>
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap p-[15px] cursor-text"
          style={{ paddingInlineEnd: 24 }}
          onClick={toggleEdit}>
          {children}
        </div>
      )
    }

    return <td {...restProps}>{childNode}</td>
  }

  const defaultColumns: (ColumnTypes[any] & {
    editable?: boolean
    dataIndex: string
  })[] = [
    {
      title: trans(tkeys.common.name),
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      editable: true,
    },
    {
      title: trans(tkeys.common.description),
      dataIndex: 'description',
      width: 320,
      align: 'center',
      editable: true,
    },
    {
      title: trans(tkeys.common.createdBy),
      dataIndex: 'createdBy',
      width: 120,
      align: 'center',
    },
    {
      title: trans(tkeys.common.updatedAt),
      dataIndex: 'updatedAt',
      width: 120,
      align: 'center',
      render: (value) => {
        return (
          <>{dayjs(value, dateTimeFormat).locale('th').format(buddhistEra)}</>
        )
      },
    },
    {
      title: trans(tkeys.common.action),
      dataIndex: 'type',
      width: 90,
      render: (_value, record) => {
        return (
          <div className="text-center mx-auto">
            <Popconfirm
              title={trans(tkeys.common.sureToDelete)}
              onConfirm={() => deleteHandle(record.id)}
              description={trans(tkeys.common.deleteDescription)}
              okText={trans(tkeys.common.yes)}
              cancelText={trans(tkeys.common.no)}>
              <a className="text-center mx-auto">
                {trans(tkeys.common.delete)}
              </a>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  const handleAdd = () => {
    const randomNum = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, '0')

    updateHandle({
      name: `name${randomNum}`,
      description: '',
    })
  }

  const handleSave = (row: GetBranchsInventoryType) => {
    const findData: any = data.find((e: any) => e.id === row.id)
    if (
      row.description !== findData.description ||
      row.name !== findData.name
    ) {
      updateHandle({
        id: row.id,
        name: row.name,
        description: row.description,
      })
    }
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: GetBranchsInventoryType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })

  return {
    columns,
    components,
    handleAdd,
  }
}
