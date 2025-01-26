import React, { useEffect, useMemo, useState } from 'react'
import BlockUi from 'react-block-ui'
import { useEditorInventoryController } from './controller/controller'
import router from 'next/router'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { max, onlyNumber } from '@/utils/common/normalizeInput'
import { inventoryRoute } from '@/router/inventory'
import { EnumModeEditorPage } from '@/modules/interface'
import { MdFavorite } from 'react-icons/md'
import { dateFormat } from '@/core/common'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import MainModal from '../Menu/main/MainModal'
import { Alert, Card } from 'antd'
import { DatePickerSelectForm } from '@/components/commonAntd/DatePicker/DatePicker'
import Button from '@/components/commonAntd/Button/Button'
import { CheckBoxForm } from '@/components/commonAntd/Checkbox/CheckBox'
import { AutocompleteAsyncFrom } from '@/components/commonAntd/Autocomplete/AutocompleteSelect'
import { InputForm } from '@/components/commonAntd/Input'
interface IEditorInventoryPage {
  mode: EnumModeEditorPage
}

const EditorInventoryPage = ({ mode }: IEditorInventoryPage) => {
  const idInventory = router.query.id
  const [disabled, setDisable] = useState(false)
  const { t: trans }: any = useTranslation()

  const keyEditor = useMemo(() => {
    return tkeys.Inventory.MainPage.editor
  }, [])

  useEffect(() => {
    if (mode === EnumModeEditorPage.VIEW) setDisable(true)
  }, [mode])

  const {
    formHandler: { control, onSubmit, setValue },
    inventoriesType: { inventoriesTypeData, inventoriesTypeLoading },
    inventoriesBrand: { inventoriesBrandData, inventoriesBrandLoading },
    inventoriesBranch: { inventoriesBranchData, inventoriesBranchLoading },
    inventory: { deleteInventoryHandle },
    // dialogType: { openDialogType, handleCloseType, handleOpenType },
    // upsertTypeHandle: { updateTypeHandle },
    // dialogBrand: { openDialogBrand, handleCloseBrand, handleOpenBrand },
    // dialogBranch: { openDialogBranch, handleCloseBranch, handleOpenBranch },
    // upsertBrandHandle: { updateBrandHandle },
    // upsertBranchHandle: { updateBranchHandle },
    branch: {
      branchModal,
      upsertInventoryBranchLoading,
      updateBranchHandle,
      deleteBranchHandle,
      deleteInventoryBranchLoading,
    },
    brand: {
      brandModal,
      upsertInventoryBrandLoading,
      updateBrandHandle,
      deleteBrandHandle,
      deleteInventoryBrandLoading,
    },
    type: {
      typeModal,
      upsertInventoryTypeLoading,
      updateTypeHandle,
      deleteTypeHandle,
      deleteInventoryTypeLoading,
    },
  } = useEditorInventoryController({ idInventory })

  const styleIconPageMarch: React.CSSProperties = {
    color: '#a78bfa',
    backgroundColor: '#FFFFFF',
    padding: '8px',
    borderRadius: '4px',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '20px',
    border: '1px solid #E9E4ED',
    cursor: 'pointer',
  }
  return (
    <BlockUi tag="div" blocking={false}>
      <MainModal
        mode="branch"
        modalProps={branchModal}
        data={inventoriesBranchData}
        loading={
          inventoriesBranchLoading ||
          upsertInventoryBranchLoading ||
          deleteInventoryBranchLoading
        }
        updateHandle={updateBranchHandle}
        deleteHandle={deleteBranchHandle}
      />
      <MainModal
        mode="brand"
        modalProps={brandModal}
        data={inventoriesBrandData}
        loading={
          inventoriesBrandLoading ||
          upsertInventoryBrandLoading ||
          deleteInventoryBrandLoading
        }
        updateHandle={updateBrandHandle}
        deleteHandle={deleteBrandHandle}
      />
      <MainModal
        mode="type"
        modalProps={typeModal}
        data={inventoriesTypeData}
        loading={
          inventoriesTypeLoading ||
          upsertInventoryTypeLoading ||
          deleteInventoryTypeLoading
        }
        updateHandle={updateTypeHandle}
        deleteHandle={deleteTypeHandle}
      />
      <div className="w-full mainBg min-h-[calc(100vh + 10px)] h-auto lg:h-[calc(100vh)]">
        <div className="p-[15px]">
          <div className="bg-white m-0 rounded-lg lg:p-[35px] lg:min-h-[calc(100vh-63px)] min-h-[calc(100vh-56px)]">
            <div className="mb-[0px] h-full">
              <div className="p-4">
                <div className="flex">
                  <IoIosArrowRoundBack
                    onClick={() => {
                      router.back()
                    }}
                    className="iconPage"
                    style={styleIconPageMarch}
                    size={28}
                  />
                  <div className="ml-4 my-auto">
                    <p className="text-secondary p-0 m-0 text-sm">
                      {trans(keyEditor.back)}
                    </p>
                    <h3 className="text-primary p-0 m-0 mt-[5px] text-2xl">
                      {mode === EnumModeEditorPage.UPDATE
                        ? trans(keyEditor.headers.update)
                        : mode === EnumModeEditorPage.CREATE
                        ? trans(keyEditor.headers.create)
                        : trans(keyEditor.headers.view)}
                    </h3>
                  </div>
                </div>
                {mode !== EnumModeEditorPage.VIEW && (
                  <Alert
                    className="mt-[10px]"
                    message={trans(keyEditor.warning.header)}
                    description={trans(keyEditor.warning.text)}
                    type="warning"
                    showIcon
                    closable
                  />
                )}
                <div className="lg:grid gap-4 lg:grid-cols-2 mt-[20px]">
                  <div className="w-[100%]">
                    <div className="">
                      <p className="text-xl m-0 text-primary">
                        {trans(keyEditor.type.description.label)}
                      </p>
                      <Card style={{ marginTop: '15px' }}>
                        <div className="p-2">
                          <InputForm
                            control={control}
                            id="name"
                            name="name"
                            inputLabel={{
                              label: trans(
                                keyEditor.type.description.fields.name,
                              ),
                              required: true,
                              classNames:
                                'text-base !text-secondary !font-semibold',
                            }}
                            type={'text'}
                            variant={'outlined'}
                            disabled={disabled}
                            normalizes={[max(50)]}
                          />
                        </div>
                        <div className="p-2 pb-0">
                          <InputForm
                            control={control}
                            id="description"
                            name="description"
                            rows={6}
                            multiline
                            inputLabel={{
                              label: trans(
                                keyEditor.type.description.fields.description,
                              ),
                              required: false,
                              classNames:
                                'text-base !text-secondary !font-semibold',
                            }}
                            type={'text'}
                            variant={'outlined'}
                            disabled={disabled}
                            normalizes={[max(290)]}
                          />
                        </div>
                        <div className="p-2 pb-0 mt-2">
                          <DatePickerSelectForm
                            id="expiryDate"
                            name="expiryDate"
                            control={control}
                            disabled={disabled}
                            inputLabel={{
                              label: trans(
                                keyEditor.type.description.fields.expiryDate,
                              ),
                              required: false,
                              classNames:
                                'text-base !text-secondary !font-semibold',
                            }}
                            inputFormat={dateFormat}
                            size="large"
                          />
                        </div>
                      </Card>
                    </div>
                    <div className="mt-[15px]">
                      <div className="flex justify-between h-[50px]">
                        <p className="text-xl m-0 text-primary">
                          {trans(keyEditor.type.category.label)}
                        </p>
                        <div className="flex gap-[15px]">
                          <Button
                            onClick={typeModal.handleOpen}
                            type="primary"
                            style={{ marginBottom: 16 }}
                            label={`${trans(
                              tkeys.Inventory.MainPage.menu.type,
                            )} +`}
                          />
                          <Button
                            onClick={brandModal.handleOpen}
                            type="primary"
                            style={{ marginBottom: 16 }}
                            label={`${trans(
                              tkeys.Inventory.MainPage.menu.brand,
                            )} +`}
                          />
                          <Button
                            onClick={branchModal.handleOpen}
                            type="primary"
                            style={{ marginBottom: 16 }}
                            label={`${trans(
                              tkeys.Inventory.MainPage.menu.branch,
                            )} +`}
                          />
                        </div>
                      </div>
                      <Card style={{ marginTop: '5px' }}>
                        <div className="p-2">
                          <AutocompleteAsyncFrom
                            name="type"
                            control={control}
                            id="type"
                            classNames=" mx-auto mt-[10px]"
                            labelIndex="name"
                            valueIndex={'id'}
                            disabled={disabled}
                            options={inventoriesTypeData}
                            InputProps={{
                              label: 'Type',
                              placeholder: 'Type',
                            }}
                            inputLabel={{
                              label: trans(keyEditor.type.category.fields.type),
                              required: true,
                              classNames:
                                'text-base !text-secondary !font-semibold',
                            }}
                            loading={inventoriesTypeLoading}
                            size="medium"
                          />
                        </div>
                        <div className="p-2 pb-0">
                          <AutocompleteAsyncFrom
                            // inputRef={typeFieldRef}
                            name="brand"
                            control={control}
                            id="brand"
                            disabled={disabled}
                            classNames=" mx-auto mt-[10px]"
                            labelIndex="name"
                            valueIndex="id"
                            options={inventoriesBrandData}
                            inputLabel={{
                              label: trans(
                                keyEditor.type.category.fields.brand,
                              ),
                              required: true,
                              classNames:
                                'text-base !text-secondary !font-semibold',
                            }}
                            InputProps={{
                              label: 'Brand',
                              placeholder: 'Brand',
                            }}
                            loading={inventoriesBrandLoading}
                          />
                        </div>
                        <div className="p-2 pb-0">
                          <AutocompleteAsyncFrom
                            // inputRef={typeFieldRef}
                            name="branch"
                            control={control}
                            id="branch"
                            disabled={disabled}
                            classNames=" mx-auto mt-[10px]"
                            labelIndex="name"
                            valueIndex="id"
                            options={inventoriesBranchData}
                            inputLabel={{
                              label: trans(
                                keyEditor.type.category.fields.branch,
                              ),
                              required: true,
                              classNames:
                                'text-base !text-secondary !font-semibold',
                            }}
                            InputProps={{
                              label: 'Branch',
                              placeholder: 'Branch',
                            }}
                            loading={inventoriesBranchLoading}
                          />
                        </div>
                      </Card>
                    </div>
                    <div className="mt-[15px]">
                      <p className="text-xl m-0 text-primary">
                        {trans(keyEditor.type.inventory.label)}
                      </p>
                      <Card style={{ marginTop: '15px' }}>
                        <div className="grid lg:grid-cols-12 gap-[10px]">
                          <div className="lg:col-span-4 p-2">
                            <InputForm
                              control={control}
                              id="quantity"
                              name="quantity"
                              inputLabel={{
                                label: trans(
                                  keyEditor.type.inventory.fields.amount,
                                ),
                                required: true,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              type={'text'}
                              variant={'outlined'}
                              normalizes={[onlyNumber, max(8)]}
                              disabled={disabled}
                            />
                          </div>
                          <div className="lg:col-span-8 p-2">
                            <InputForm
                              control={control}
                              id="sku"
                              name="sku"
                              placeholder="CAT-FOD-KID-S"
                              inputLabel={{
                                label: trans(
                                  keyEditor.type.inventory.fields.sku,
                                ),
                                required: false,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              type={'text'}
                              variant={'outlined'}
                              disabled={disabled}
                              normalizes={[max(120)]}
                            />
                          </div>
                          <div className="lg:col-span-8 p-2">
                            <InputForm
                              control={control}
                              id="serialNumber"
                              name="serialNumber"
                              placeholder="#123"
                              inputLabel={{
                                label: trans(
                                  keyEditor.type.inventory.fields.serialNumber,
                                ),
                                required: false,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              type={'text'}
                              variant={'outlined'}
                              disabled={disabled}
                              normalizes={[max(120)]}
                            />
                          </div>
                        </div>
                        <div className="p-2 lg:max-w-[250px]">
                          <h5 className="text-primary font-medium">
                            {trans(keyEditor.type.inventory.text)}
                          </h5>
                          <InputForm
                            control={control}
                            id="reorder"
                            name="reorder"
                            placeholder={trans(
                              keyEditor.type.inventory.fields.reorder,
                            )}
                            inputLabel={{
                              label: trans(
                                keyEditor.type.inventory.fields.reorder,
                              ),
                              required: false,
                              classNames:
                                'text-base !text-secondary !font-semibold',
                            }}
                            type={'text'}
                            variant={'outlined'}
                            normalizes={[onlyNumber, max(8)]}
                            disabled={disabled}
                          />
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div className="w-[100%]">
                    <div className="mt-[15px] lg:mt-0">
                      <p className="text-xl m-0 text-primary">
                        {trans(keyEditor.type.shipping.label)}
                      </p>
                      <Card style={{ marginTop: '15px' }}>
                        <div className="p-2">
                          <InputForm
                            control={control}
                            id="weight"
                            name="weight"
                            inputLabel={{
                              label: trans(
                                keyEditor.type.shipping.fields.weight,
                              ),
                              required: false,
                              classNames:
                                'text-base !text-secondary !font-semibold',
                            }}
                            suffix={trans(keyEditor.type.shipping.fields.kg)}
                            type={'text'}
                            variant={'outlined'}
                            normalizes={[onlyNumber, max(8)]}
                            disabled={disabled}
                          />
                        </div>
                        <h5 className="px-2 text-primary font-medium">
                          {trans(keyEditor.type.shipping.text)}
                        </h5>
                        <div className="p-2">
                          <div className="grid lg:grid-cols-3 gap-[10px]">
                            <InputForm
                              control={control}
                              id="width"
                              name="width"
                              inputLabel={{
                                label: trans(
                                  keyEditor.type.shipping.fields.width,
                                ),
                                required: false,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              type={'text'}
                              variant={'outlined'}
                              suffix={trans(keyEditor.type.shipping.fields.cm)}
                              normalizes={[onlyNumber, max(8)]}
                              disabled={disabled}
                            />
                            <InputForm
                              control={control}
                              id="length"
                              name="length"
                              inputLabel={{
                                label: trans(
                                  keyEditor.type.shipping.fields.length,
                                ),
                                required: false,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              type={'text'}
                              variant={'outlined'}
                              suffix={trans(keyEditor.type.shipping.fields.cm)}
                              normalizes={[onlyNumber, max(8)]}
                              disabled={disabled}
                            />
                            <InputForm
                              control={control}
                              id="height"
                              name="height"
                              inputLabel={{
                                label: trans(
                                  keyEditor.type.shipping.fields.height,
                                ),
                                required: false,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              type={'text'}
                              variant={'outlined'}
                              suffix={trans(keyEditor.type.shipping.fields.cm)}
                              normalizes={[onlyNumber, max(8)]}
                              disabled={disabled}
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="mt-[15px]">
                      <p className="text-xl m-0 text-primary">
                        {trans(keyEditor.type.pricing.lebel)}
                      </p>
                      <Card style={{ marginTop: '15px' }}>
                        <div className="p-2">
                          <div className="grid lg:grid-cols-2 gap-[15px]">
                            <InputForm
                              control={control}
                              id="price"
                              name="price"
                              inputLabel={{
                                label: trans(
                                  keyEditor.type.pricing.fields.price,
                                ),
                                required: true,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              prefix={trans(keyEditor.type.pricing.b)}
                              type={'text'}
                              variant={'outlined'}
                              normalizes={[onlyNumber, max(8)]}
                              disabled={disabled}
                            />
                            <InputForm
                              control={control}
                              id="memberPrice"
                              name="memberPrice"
                              inputLabel={{
                                label: trans(
                                  keyEditor.type.pricing.fields.memberPrice,
                                ),
                                required: false,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              prefix={trans(keyEditor.type.pricing.b)}
                              type={'text'}
                              variant={'outlined'}
                              normalizes={[onlyNumber, max(8)]}
                              disabled={disabled}
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                    {mode !== EnumModeEditorPage.CREATE && (
                      <div className="mt-[15px]">
                        <p className="text-xl m-0 text-primary">
                          {trans(keyEditor.type.user.label)}
                        </p>
                        <Card style={{ marginTop: '15px' }}>
                          <div className="p-2">
                            <div className="grid lg:grid-cols-2 gap-[15px]">
                              <InputForm
                                control={control}
                                id="updatedBy"
                                name="updatedBy"
                                inputLabel={{
                                  label: trans(
                                    keyEditor.type.user.field.updateBy,
                                  ),
                                  required: false,
                                  classNames:
                                    'text-base !text-secondary !font-semibold',
                                }}
                                type={'text'}
                                variant={'outlined'}
                                disabled={true}
                              />
                              <InputForm
                                control={control}
                                id="updatedAt"
                                name="updatedAt"
                                inputLabel={{
                                  label: trans(
                                    keyEditor.type.user.field.updateAt,
                                  ),
                                  required: false,
                                  classNames:
                                    'text-base !text-secondary !font-semibold',
                                }}
                                type={'text'}
                                variant={'outlined'}
                                disabled={true}
                              />
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}
                    <div className="mt-[20px] flex justify-end gap-[15px] h-[50px]">
                      {mode !== EnumModeEditorPage.VIEW && (
                        <div className="w-full max-w-[40px] my-auto">
                          <CheckBoxForm
                            control={control}
                            id={'favorite'}
                            name="favorite"
                            classNames="scale-[2]"
                            icon={<MdFavorite />}
                            checkedIcon={<MdFavorite color="red" />}
                          />
                        </div>
                      )}
                      <Button
                        onClick={() => {
                          router.push({ pathname: inventoryRoute.path })
                        }}
                        color="default"
                        variant="outlined"
                        style={{ marginBottom: 16, width: '150px' }}
                        size="large"
                        label={
                          mode === EnumModeEditorPage.VIEW
                            ? trans(tkeys.common.button.back)
                            : trans(tkeys.common.button.discard)
                        }
                      />
                      {mode === EnumModeEditorPage.UPDATE && (
                        <Button
                          onClick={deleteInventoryHandle}
                          color="danger"
                          size="large"
                          variant="outlined"
                          style={{ marginBottom: 16, width: '150px' }}
                          label={trans(tkeys.common.button.delete)}
                        />
                      )}
                      {mode !== EnumModeEditorPage.VIEW && (
                        <Button
                          onClick={onSubmit}
                          color="primary"
                          size="large"
                          variant="outlined"
                          style={{ marginBottom: 16, width: '150px' }}
                          label={
                            mode === EnumModeEditorPage.UPDATE
                              ? trans(tkeys.common.button.updateItem)
                              : trans(tkeys.common.button.addItem)
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlockUi>
  )
}

export default EditorInventoryPage
