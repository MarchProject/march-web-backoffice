import { InputForm } from '@/components/common/Input'
import React, { useEffect, useMemo, useState } from 'react'
import BlockUi from 'react-block-ui'
import { useEditorInventoryController } from './controller'
import { Card, CardContent, InputAdornment } from '@mui/material'
import router from 'next/router'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { AutocompleteSelectAsyncFrom } from '@/components/common/Autocomplete/AutocompleteSelect'
import { max, onlyNumber } from '@/utils/common/normalizeInput'
import { DatePickerSelectForm } from '@/components/common/DatePicker/DatePicker'
import ButtonForm from '@/components/common/Button/button'
import { inventoryRoute } from '@/router/inventory'
import { EnumModeEditorPage } from '@/modules/interface'
import { MdFavorite } from 'react-icons/md'
import { CheckBoxForm } from '@/components/common/Checkbox/CheckBox'
import AlertToast from '@/components/common/Alert/alert'
import { dateFormat } from '@/core/common'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { DialogType } from '../dialog/DialogEditor/DialogType/DialogType'
import { DialogBrand } from '../dialog/DialogEditor/DialogBrand/DialogBrand'
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
    inventory: { deleteInventoryHandle },
    dialogType: { openDialogType, handleCloseType, handleOpenType },
    upsertTypeHandle: { updateTypeHandle },
    dialogBrand: { openDialogBrand, handleCloseBrand, handleOpenBrand },
    upsertBrandHandle: { updateBrandHandle },
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
      <DialogType
        open={openDialogType}
        handleClose={handleCloseType}
        inventoriesTypeData={inventoriesTypeData}
        deleteTypeHandle={() => {}}
        updateTypeHandle={updateTypeHandle}
        handleSearchInventoryType={() => {}}
        isEditPage={true}
      />
      <DialogBrand
        open={openDialogBrand}
        handleClose={handleCloseBrand}
        inventoriesBrandData={inventoriesBrandData}
        deleteBrandHandle={() => {}}
        updateBrandHandle={updateBrandHandle}
        handleSearchInventoryBrand={() => {}}
        isEditPage={true}
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
                  <AlertToast
                    classNames="mt-[10px]"
                    severity="warning"
                    variant="standard"
                    title={trans(keyEditor.warning.header)}
                    message={trans(keyEditor.warning.text)}
                  />
                )}
                <div className="lg:grid gap-4 lg:grid-cols-2 mt-[20px]">
                  <div className="w-[100%]">
                    <div className="">
                      <p className="text-xl m-0 text-primary">
                        {trans(keyEditor.type.description.label)}
                      </p>
                      <Card variant="outlined" sx={{ marginTop: '15px' }}>
                        <CardContent>
                          <div className="p-2">
                            <InputForm
                              // required
                              control={control}
                              classNames=""
                              id="name"
                              name="name"
                              // label='Item Name'
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
                              classNames=""
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
                              mask={'__/__/____'}
                              inputFormat={dateFormat}
                              onError={(reason, _value) => {
                                if (reason) {
                                  setValue('expiryDate', 'Invalid Date')
                                }
                              }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="mt-[15px]">
                      <div className="flex justify-between h-[50px]">
                        <p className="text-xl m-0 text-primary">
                          {trans(keyEditor.type.category.label)}
                        </p>
                        <div className="flex gap-[15px]">
                          <ButtonForm
                            classNames="!w-[150px] !normal-case"
                            label={`${trans(
                              tkeys.Inventory.MainPage.menu.type,
                            )} +`}
                            color={'primary'}
                            variant="outlined"
                            onClick={handleOpenType}
                          />
                          <ButtonForm
                            classNames="!w-[150px] !normal-case"
                            label={`${trans(
                              tkeys.Inventory.MainPage.menu.brand,
                            )} +`}
                            color={'primary'}
                            variant="outlined"
                            onClick={handleOpenBrand}
                          />
                        </div>
                      </div>
                      <Card variant="outlined" sx={{ marginTop: '15px' }}>
                        <CardContent>
                          <div className="p-2">
                            <AutocompleteSelectAsyncFrom
                              // inputRef={typeFieldRef}
                              name="type"
                              control={control}
                              id="type"
                              classNames=" mx-auto mt-[10px]"
                              labelIndex="name"
                              valueIndex={'id'}
                              multiple={false}
                              disabled={disabled}
                              options={inventoriesTypeData}
                              InputProps={{
                                label: 'Type',
                                placeholder: 'Type',
                              }}
                              inputLabel={{
                                label: trans(
                                  keyEditor.type.category.fields.type,
                                ),
                                required: true,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              loading={inventoriesTypeLoading}
                            />
                          </div>
                          <div className="p-2 pb-0">
                            <AutocompleteSelectAsyncFrom
                              // inputRef={typeFieldRef}
                              name="brand"
                              control={control}
                              id="brand"
                              disabled={disabled}
                              classNames=" mx-auto mt-[10px]"
                              labelIndex="name"
                              valueIndex="id"
                              multiple={false}
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
                        </CardContent>
                      </Card>
                    </div>
                    <div className="mt-[15px]">
                      <p className="text-xl m-0 text-primary">
                        {trans(keyEditor.type.inventory.label)}
                      </p>
                      <Card variant="outlined" sx={{ marginTop: '15px' }}>
                        <CardContent>
                          <div className="grid lg:grid-cols-12 gap-[10px]">
                            <div className="lg:col-span-4 p-2">
                              <InputForm
                                // required
                                control={control}
                                classNames="max-w-[220px]"
                                id="quantity"
                                name="quantity"
                                // label='Item Name'
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
                                // required
                                control={control}
                                classNames=""
                                id="sku"
                                name="sku"
                                // label='Item Name'
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
                          </div>
                          <div className="p-2 lg:max-w-[250px]">
                            <h5 className="text-primary font-medium">
                              {trans(keyEditor.type.inventory.text)}
                            </h5>
                            <InputForm
                              // required
                              control={control}
                              classNames=""
                              id="reorder"
                              name="reorder"
                              // label='Item Name'
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
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="w-[100%]">
                    <div className="mt-[15px] lg:mt-0">
                      <p className="text-xl m-0 text-primary">
                        {trans(keyEditor.type.shipping.label)}
                      </p>
                      <Card variant="outlined" sx={{ marginTop: '15px' }}>
                        <CardContent>
                          <div className="p-2">
                            <InputForm
                              // required
                              control={control}
                              classNames=""
                              id="weight"
                              name="weight"
                              // label='Item Name'
                              inputLabel={{
                                label: trans(
                                  keyEditor.type.shipping.fields.weight,
                                ),
                                required: false,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    {trans(keyEditor.type.shipping.fields.kg)}
                                  </InputAdornment>
                                ),
                              }}
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
                                // required
                                control={control}
                                classNames=""
                                id="width"
                                name="width"
                                // label='Item Name'
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
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      {trans(keyEditor.type.shipping.fields.cm)}
                                    </InputAdornment>
                                  ),
                                }}
                                normalizes={[onlyNumber, max(8)]}
                                disabled={disabled}
                              />
                              <InputForm
                                // required
                                control={control}
                                classNames=""
                                id="length"
                                name="length"
                                // label='Item Name'
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
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      {trans(keyEditor.type.shipping.fields.cm)}
                                    </InputAdornment>
                                  ),
                                }}
                                normalizes={[onlyNumber, max(8)]}
                                disabled={disabled}
                              />
                              <InputForm
                                // required
                                control={control}
                                classNames=""
                                id="height"
                                name="height"
                                // label='Item Name'
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
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      {trans(keyEditor.type.shipping.fields.cm)}
                                    </InputAdornment>
                                  ),
                                }}
                                normalizes={[onlyNumber, max(8)]}
                                disabled={disabled}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="mt-[15px]">
                      <p className="text-xl m-0 text-primary">
                        {trans(keyEditor.type.pricing.lebel)}
                      </p>
                      <Card variant="outlined" sx={{ marginTop: '15px' }}>
                        <CardContent>
                          <div className="p-2">
                            <div className="grid lg:grid-cols-2 gap-[15px]">
                              <InputForm
                                // required
                                control={control}
                                classNames=""
                                id="price"
                                name="price"
                                // label='Item Name'
                                inputLabel={{
                                  label: trans(
                                    keyEditor.type.pricing.fields.price,
                                  ),
                                  required: true,
                                  classNames:
                                    'text-base !text-secondary !font-semibold',
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {trans(keyEditor.type.pricing.b)}
                                    </InputAdornment>
                                  ),
                                }}
                                type={'text'}
                                variant={'outlined'}
                                normalizes={[onlyNumber, max(8)]}
                                disabled={disabled}
                              />
                              <InputForm
                                // required
                                control={control}
                                classNames=""
                                id="memberPrice"
                                name="memberPrice"
                                // label='Item Name'
                                inputLabel={{
                                  label: trans(
                                    keyEditor.type.pricing.fields.memberPrice,
                                  ),
                                  required: false,
                                  classNames:
                                    'text-base !text-secondary !font-semibold',
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {trans(keyEditor.type.pricing.b)}
                                    </InputAdornment>
                                  ),
                                }}
                                type={'text'}
                                variant={'outlined'}
                                normalizes={[onlyNumber, max(8)]}
                                disabled={disabled}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    {mode !== EnumModeEditorPage.CREATE && (
                      <div className="mt-[15px]">
                        <p className="text-xl m-0 text-primary">
                          {trans(keyEditor.type.user.label)}
                        </p>
                        <Card variant="outlined" sx={{ marginTop: '15px' }}>
                          <CardContent>
                            <div className="p-2">
                              <div className="grid lg:grid-cols-2 gap-[15px]">
                                <InputForm
                                  control={control}
                                  classNames=""
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
                                  // required
                                  control={control}
                                  classNames=""
                                  id="updatedAt"
                                  name="updatedAt"
                                  // label='Item Name'
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
                          </CardContent>
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
                            checkedIcon={<MdFavorite />}
                          />
                        </div>
                      )}
                      <ButtonForm
                        classNames="max-w-[150px] !normal-case"
                        color="secondary"
                        variant="outlined"
                        onClick={() => {
                          router.push({ pathname: inventoryRoute.path })
                        }}
                        label={
                          mode === EnumModeEditorPage.VIEW
                            ? trans(tkeys.button.back)
                            : trans(tkeys.button.discard)
                        }
                      />
                      {mode === EnumModeEditorPage.UPDATE && (
                        <ButtonForm
                          classNames="max-w-[150px] !normal-case"
                          color="error"
                          variant="contained"
                          onClick={deleteInventoryHandle}
                          label={trans(tkeys.button.delete)}
                        />
                      )}
                      {mode !== EnumModeEditorPage.VIEW && (
                        <ButtonForm
                          classNames="max-w-[150px] !normal-case"
                          onClick={onSubmit}
                          label={
                            mode === EnumModeEditorPage.UPDATE
                              ? trans(tkeys.button.updateItem)
                              : trans(tkeys.button.addItem)
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
