import { InputForm } from '@/components/common/Input'
import React from 'react'
import BlockUi from 'react-block-ui'
import { useEditorInventoryController } from './controller'
import { Button, Card, CardContent, InputAdornment } from '@mui/material'
import router from 'next/router'
// import { styleIconPageMarch } from '@/utils/style/utill'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { AutocompleteSelectAsyncFrom } from '@/components/common/Autocomplete/AutocompleteSelect'
import { max, onlyNumber } from '@/utils/common/normalizeInput'
import {
  DatePickerSelect,
  DatePickerSelectForm,
} from '@/components/common/DatePicker/DatePicker'
import { dateFormat } from '@/core/common'

const EditorInventoryPage = ({ inventory }: any) => {
  const {
    formHandler: { control, onSubmit },
    inventoriesType: { inventoriesTypeData, inventoriesTypeLoading },
    inventoriesBrand: { inventoriesBrandData, inventoriesBrandLoading },
  } = useEditorInventoryController()

  const styleIconPageMarch: React.CSSProperties = {
    color: '#9A73B5',
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
                      {inventory ? 'Edit Item' : 'Add New Item'}
                    </h3>
                  </div>
                </div>
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
                            />
                          </div>
                          <div className="p-2 pb-0 mt-2">
                            <DatePickerSelectForm
                              id="expiryDate"
                              name="expiryDate"
                              control={control}
                              inputLabel={{
                                label: 'Expiry Date',
                                required: false,
                                classNames:
                                  'text-base !text-secondary !font-semibold',
                              }}
                              mask={'__/__/____'}
                              inputFormat={dateFormat}
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
                              name="typeFilter"
                              control={control}
                              id="typeFilter"
                              classNames=" mx-auto mt-[10px]"
                              labelIndex="name"
                              valueIndex={'id'}
                              multiple={false}
                              options={inventoriesTypeData}
                              InputProps={{
                                label: 'Type Filter',
                                placeholder: 'Type',
                              }}
                              loading={inventoriesTypeLoading}
                            />
                          </div>
                          <div className="p-2 pb-0">
                            <AutocompleteSelectAsyncFrom
                              // inputRef={typeFieldRef}
                              name="brandFilter"
                              control={control}
                              id="brandFilter"
                              classNames=" mx-auto mt-[20px]"
                              labelIndex="name"
                              valueIndex={'id'}
                              multiple={false}
                              options={inventoriesBrandData}
                              InputProps={{
                                label: 'Brand Filter',
                                placeholder: 'Type',
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
                                normalizes={[onlyNumber, max(6)]}
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
                              normalizes={[onlyNumber, max(6)]}
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
                              normalizes={[onlyNumber, max(6)]}
                            />
                          </div>
                          <h5 className="px-2">
                            Package Size(The package size use to ship your
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
                                normalizes={[onlyNumber, max(10)]}
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
                                normalizes={[onlyNumber, max(10)]}
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
                                normalizes={[onlyNumber, max(10)]}
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
                                normalizes={[onlyNumber, max(10)]}
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
                                normalizes={[onlyNumber, max(10)]}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <Button onClick={onSubmit}>onSubmit</Button>
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
