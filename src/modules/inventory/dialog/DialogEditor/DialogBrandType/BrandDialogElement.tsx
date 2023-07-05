import ButtonForm from '@/components/common/Button/button'
import { Input } from '@/components/common/Input'
import { GetInventoryTypes } from '@/core/gql/inventory'
import { List, ListSubheader, ListItem, ListItemText } from '@mui/material'
import { useEffect, useState } from 'react'
import BlockUi from 'react-block-ui'
import { MdDeleteForever } from 'react-icons/md'
import { RiEdit2Line } from 'react-icons/ri'
import { ModeDialog } from '../controller'

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
}) => {
  const [inventoryTypeData, setInventoriyTypeData] =
    useState<GetInventoryTypes>()

  const [createInventoryTypeData, setCreateInventoriyTypeData] =
    useState<GetInventoryTypes>(null)

  useEffect(() => {
    setCreateInventoriyTypeData(null)
  }, [editType])

  useEffect(() => {
    setInventoriyTypeData(inventoriesBrandData.find((t) => t.id === idType))
  }, [inventoriesBrandData, idType, setInventoriyTypeData, editType])

  return (
    <>
      {editType === ModeDialog.VIEW ? (
        <BlockUi tag="div" blocking={deleteInventoryBrandLoading}>
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
              value={inventoryTypeData?.description}
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