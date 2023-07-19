import { InputForm } from '@/components/common/Input'
import React, { useEffect, useState } from 'react'
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
import { warningDelete } from '@/constant'
import { EnumModeEditorPage } from '@/modules/interface'
import { MdFavorite } from 'react-icons/md'
import { CheckBoxForm } from '@/components/common/Checkbox/CheckBox'
import AlertToast from '@/components/common/Alert/alert'
import { dateFormat } from '@/core/common'
interface IEditorInventoryPage {
  mode: EnumModeEditorPage
}

const EditorInventoryPage = ({ mode }: IEditorInventoryPage) => {
  const idInventory = router.query.id
  const [disabled, setDisable] = useState(false)

  useEffect(() => {
    if (mode === EnumModeEditorPage.VIEW) setDisable(true)
  }, [mode])

  const {
    formHandler: { control, onSubmit, setValue },
    inventoriesType: { inventoriesTypeData, inventoriesTypeLoading },
    inventoriesBrand: { inventoriesBrandData, inventoriesBrandLoading },
    inventory: { deleteInventoryHandle },
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
      <div className="w-full mainBg h-screen">
        <div className="p-[15px]">
          <div className="bg-white m-0 rounded-lg p-[35px]">
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
                      Back to inventory list
                    </p>
                    <h3 className="text-primary p-0 m-0 mt-[5px] text-2xl">
                      {mode === EnumModeEditorPage.UPDATE
                        ? 'Edit Item'
                        : mode === EnumModeEditorPage.CREATE
                        ? 'Add New Item'
                        : 'View Item'}
                    </h3>
                  </div>
                </div>
                {mode !== EnumModeEditorPage.VIEW && (
                  <AlertToast
                    classNames="mt-[10px]"
                    severity="warning"
                    variant="standard"
                    title="Warning !"
                    message={warningDelete}
                  />
                )}
                <div className="md:grid gap-4 md:grid-cols-2 mt-[20px]">
                  <div className="w-[100%]">
                    <div className="">
                      <p className="text-xl m-0 text-primary">Description</p>
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
                                label: 'Item Name',
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
                                label: 'Description',
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
                                label: 'Expiry Date',
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
                      <p className="text-xl m-0 text-primary">Category</p>
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
                                label: 'Item Type',
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
                                label: 'Item Brand',
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
                      <p className="text-xl m-0 text-primary">Inventory</p>
                      <Card variant="outlined" sx={{ marginTop: '15px' }}>
                        <CardContent>
                          <div className="grid grid-cols-12 gap-[10px]">
                            <div className="col-span-4 p-2">
                              <InputForm
                                // required
                                control={control}
                                classNames="max-w-[220px]"
                                id="quantity"
                                name="quantity"
                                // label='Item Name'
                                inputLabel={{
                                  label: 'Quantity',
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
                            <div className="col-span-8 p-2">
                              <InputForm
                                // required
                                control={control}
                                classNames=""
                                id="sku"
                                name="sku"
                                // label='Item Name'
                                placeholder="CAT-FOD-KID-S"
                                inputLabel={{
                                  label: 'SKU (Optional)',
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
                          <div className="p-2">
                            <h5 className="">
                              The minimum quantity for warning to reorder
                            </h5>
                            <InputForm
                              // required
                              control={control}
                              classNames=""
                              id="reorder"
                              name="reorder"
                              // label='Item Name'
                              placeholder="minimum"
                              inputLabel={{
                                label: 'Reorder Level',
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
                    <div className="">
                      <p className="text-xl m-0 text-primary">
                        Shipping and Delivery
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
                                label: 'Item Weight',
                                required: false,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    kg
                                  </InputAdornment>
                                ),
                              }}
                              type={'text'}
                              variant={'outlined'}
                              normalizes={[onlyNumber, max(8)]}
                              disabled={disabled}
                            />
                          </div>
                          <h5 className="px-2 text-primary">
                            Package Size (The package size use to ship your
                            product)
                          </h5>
                          <div className="p-2">
                            <div className="grid grid-cols-3 gap-[10px]">
                              <InputForm
                                // required
                                control={control}
                                classNames=""
                                id="width"
                                name="width"
                                // label='Item Name'
                                inputLabel={{
                                  label: 'Width',
                                  required: false,
                                  classNames:
                                    'text-base !text-secondary !font-semibold',
                                }}
                                type={'text'}
                                variant={'outlined'}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      cm
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
                                  label: 'Length',
                                  required: false,
                                  classNames:
                                    'text-base !text-secondary !font-semibold',
                                }}
                                type={'text'}
                                variant={'outlined'}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      cm
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
                                  label: 'Height',
                                  required: false,
                                  classNames:
                                    'text-base !text-secondary !font-semibold',
                                }}
                                type={'text'}
                                variant={'outlined'}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      cm
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
                      <p className="text-xl m-0 text-primary">Pricing</p>
                      <Card variant="outlined" sx={{ marginTop: '15px' }}>
                        <CardContent>
                          <div className="p-2">
                            <div className="grid grid-cols-2 gap-[15px]">
                              <InputForm
                                // required
                                control={control}
                                classNames=""
                                id="price"
                                name="price"
                                // label='Item Name'
                                inputLabel={{
                                  label: 'Price',
                                  required: true,
                                  classNames:
                                    'text-base !text-secondary !font-semibold',
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      ฿
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
                                  label: 'Member Price',
                                  required: false,
                                  classNames:
                                    'text-base !text-secondary !font-semibold',
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      ฿
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
                        <p className="text-xl m-0 text-primary">User</p>
                        <Card variant="outlined" sx={{ marginTop: '15px' }}>
                          <CardContent>
                            <div className="p-2">
                              <div className="grid grid-cols-2 gap-[15px]">
                                <InputForm
                                  control={control}
                                  classNames=""
                                  id="updatedBy"
                                  name="updatedBy"
                                  inputLabel={{
                                    label: 'Last Updated By',
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
                                    label: 'Last Updated At',
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
                          mode === EnumModeEditorPage.VIEW ? 'Back' : 'Discard'
                        }
                      />
                      {mode === EnumModeEditorPage.UPDATE && (
                        <ButtonForm
                          classNames="max-w-[150px] !normal-case"
                          color="error"
                          variant="contained"
                          onClick={deleteInventoryHandle}
                          label={'Delete'}
                        />
                      )}
                      {mode !== EnumModeEditorPage.VIEW && (
                        <ButtonForm
                          classNames="max-w-[150px] !normal-case"
                          onClick={onSubmit}
                          label={
                            mode === EnumModeEditorPage.UPDATE
                              ? 'Update Item'
                              : 'Add Item'
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
