import ButtonForm from '@/components/common/Button/button'
import { Input } from '@/components/common/Input'
import { GetInventoryTypes } from '@/core/gql/inventory/inventory'
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  InputAdornment,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import BlockUi from 'react-block-ui'
import { MdDeleteForever } from 'react-icons/md'
import { RiEdit2Line, RiSearchLine } from 'react-icons/ri'
import { ModeDialog } from '../controller'
import { debounce } from 'lodash'

const BrandDialogElement = ({
  inventoriesBrandData,
  idType,
  setIdType,
  setEditType,
  editType,
  deleteInventoryBrandLoading,
  upsertInventoryBrandLoading,
  deleteBrandHandle,
  updateBrandHandle,
  handleSearchInventoryBrand,
}) => {
  const searchFieldRef = useRef(null)

  const handleReset = () => {
    if (searchFieldRef.current) {
      searchFieldRef.current.value = ''
    }
  }

  useEffect(() => {
    return () => {
      handleReset()
    }
  }, [])
  const [inventoryTypeData, setInventoriyTypeData] =
    useState<GetInventoryTypes>()
  const [isCreateDisable, setIsCreateDisable] = useState(false)
  const [isUpdateDisable, setIsUpdateDisable] = useState(false)
  const [createInventoryTypeData, setCreateInventoriyTypeData] =
    useState<GetInventoryTypes>(null)

  useEffect(() => {
    setCreateInventoriyTypeData(null)
  }, [editType])

  useEffect(() => {
    setInventoriyTypeData(inventoriesBrandData.find((t) => t.id === idType))
  }, [inventoriesBrandData, idType, setInventoriyTypeData, editType])

  useEffect(() => {
    if (!inventoryTypeData?.name) {
      setIsUpdateDisable(true)
    } else {
      setIsUpdateDisable(false)
    }
  }, [inventoryTypeData, setInventoriyTypeData])

  useEffect(() => {
    if (!createInventoryTypeData?.name) {
      setIsCreateDisable(true)
    } else {
      setIsCreateDisable(false)
    }
  }, [createInventoryTypeData, setInventoriyTypeData])

  return (
    <>
      {editType === ModeDialog.VIEW ? (
        <BlockUi tag="div" blocking={deleteInventoryBrandLoading}>
          <div className="flex justify-end mb-[10px]">
            <Input
              inputRef={searchFieldRef}
              classNames="max-w-[220px] w-[100%] min-w-[220px]"
              id="searchItems"
              variant="outlined"
              placeholder="Search Brand here"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiSearchLine />
                  </InputAdornment>
                ),
              }}
              onChange={debounce((e) => {
                handleSearchInventoryBrand(undefined, e.target.value)
              }, 1000)}
              type={'text'}
              name="searchItems"
              size="small"
            />
          </div>
          <List
            subheader={
              <div className="flex justify-between pr-2">
                <ListSubheader style={{ padding: 0 }}>Name</ListSubheader>
                <ListSubheader style={{ padding: 0, paddingRight: '10px' }}>
                  Action
                </ListSubheader>
              </div>
            }
            sx={{
              width: '100%',
              height: '550px',
              maxWidth: '420px',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}>
            {inventoriesBrandData.map((value) => (
              <ListItem
                className="pr-[10px]"
                key={value.id}
                disableGutters
                secondaryAction={
                  <div className="flex justify-between gap-[10px] mr-[10px]">
                    <RiEdit2Line
                      className="cursor-pointer text-primary100"
                      size={18}
                      onClick={() => {
                        setIdType(value.id)
                        setEditType(ModeDialog.EDIT)
                      }}
                    />
                    <MdDeleteForever
                      className="cursor-pointer text-secondary"
                      size={18}
                      color="red"
                      onClick={() => {
                        deleteBrandHandle(value.id)
                      }}
                    />
                  </div>
                }>
                <ListItemText primary={`${value.name}`} />
              </ListItem>
            ))}
          </List>
        </BlockUi>
      ) : editType === ModeDialog.EDIT ? (
        <BlockUi tag="div" blocking={upsertInventoryBrandLoading}>
          <div className="flex flex-col gap-[10px]">
            <Input
              id={'name'}
              type={'text'}
              name={'name'}
              inputLabel={{
                label: 'Name',
                required: false,
              }}
              variant="outlined"
              value={inventoryTypeData?.name}
              onChange={(e) => {
                setInventoriyTypeData((prev: GetInventoryTypes) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }}
            />
            <Input
              id={'description'}
              type={'text'}
              name={'description'}
              inputLabel={{
                label: 'Description',
                required: false,
              }}
              variant="outlined"
              value={inventoryTypeData?.description || ''}
              onChange={(e) => {
                setInventoriyTypeData((prev: GetInventoryTypes) => ({
                  ...prev,
                  name: prev.name,
                  description: e.target.value,
                }))
              }}
            />
            <Input
              id={'createdBy'}
              type={'text'}
              name={'createdBy'}
              variant="outlined"
              inputLabel={{
                label: 'Created By',
                required: false,
              }}
              disabled
              value={inventoryTypeData?.createdBy}
            />
            <Input
              id={'updatedBy'}
              type={'text'}
              name={'updatedBy'}
              variant="outlined"
              inputLabel={{
                label: 'Updated By',
                required: false,
              }}
              disabled
              value={inventoryTypeData?.updatedBy}
            />
            <div className="flex justify-start gap-[10px]">
              <ButtonForm
                classNames="max-w-[40px] !normal-case"
                label={'Back'}
                variant="outlined"
                onClick={() => {
                  setEditType(ModeDialog.VIEW)
                }}
              />
              <ButtonForm
                classNames="max-w-[40px] !normal-case"
                disabled={isUpdateDisable}
                label={'Update'}
                variant="contained"
                onClick={() => {
                  updateBrandHandle(inventoryTypeData)
                }}
              />
            </div>
          </div>
        </BlockUi>
      ) : (
        <BlockUi tag="div" blocking={upsertInventoryBrandLoading}>
          <div className="flex flex-col gap-[10px]">
            <Input
              id={'name'}
              type={'text'}
              name={'name'}
              inputLabel={{
                label: 'Name',
                required: false,
              }}
              variant="outlined"
              value={createInventoryTypeData?.name}
              onChange={(e) => {
                setCreateInventoriyTypeData((prev: GetInventoryTypes) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }}
            />
            <Input
              id={'description'}
              type={'text'}
              name={'description'}
              inputLabel={{
                label: 'Description',
                required: false,
              }}
              variant="outlined"
              value={createInventoryTypeData?.description}
              onChange={(e) => {
                setCreateInventoriyTypeData((prev: GetInventoryTypes) => ({
                  ...prev,
                  name: prev.name,
                  description: e.target.value,
                }))
              }}
            />
            <div className="flex justify-start gap-[10px]">
              <ButtonForm
                classNames="max-w-[40px] !normal-case"
                label={'Back'}
                variant="outlined"
                onClick={() => {
                  setInventoriyTypeData(null)
                  setEditType(ModeDialog.VIEW)
                }}
              />
              <ButtonForm
                classNames="max-w-[40px] !normal-case"
                label={editType === ModeDialog.CREATE ? 'Create' : 'Update'}
                variant="contained"
                disabled={isCreateDisable}
                onClick={() => {
                  updateBrandHandle(
                    editType === ModeDialog.CREATE
                      ? createInventoryTypeData
                      : inventoryTypeData,
                  )
                }}
              />
            </div>
          </div>
        </BlockUi>
      )}
    </>
  )
}

export default BrandDialogElement
