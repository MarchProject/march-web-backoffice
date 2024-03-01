export const headersTemplateCsv = [
  { label: 'id', key: 'id' },
  { label: 'name*', key: 'name' },
  { label: 'description', key: 'description' },
  { label: 'type*', key: 'type' },
  { label: 'brand*', key: 'brand' },
  { label: 'branch*', key: 'branch' },
  { label: 'expiryDate', key: 'expiryDate' },
  { label: 'amount*', key: 'amount' },
  { label: 'sku', key: 'sku' },
  { label: 'serialNumber', key: 'serialNumber' },
  { label: 'weight', key: 'weight' },
  { label: 'width', key: 'width' },
  { label: 'height', key: 'height' },
  { label: 'length', key: 'length' },
  { label: 'reorderLevel', key: 'reorderLevel' },
  { label: 'price*', key: 'price' },
  { label: 'priceMember', key: 'priceMember' },
  { label: 'favorite', key: 'favorite' },
]

export interface IDataTemplateCsv {
  id: string
  name: string
  type: string
  description: string
  brand: string
  branch: string
  expiryDate: string
  amount: string
  sku: string
  serialNumber: string
  reorderLevel: string
  price: string
  priceMember: string
  favorite: string
  weight: string
  width: string
  height: string
  length: string
}

interface IMessage {
  name: string
  message: string
}

export interface IDataTemplateCsvValidate extends IDataTemplateCsv {
  valid: boolean
  message: IMessage[]
}
export const dataTemplateCsv = [
  {
    id: '1',
    name: 'INTEL I7-13700KS',
    type: 'CPU-GEN13-1700',
    brand: 'INTEL',
    branch: '4',
    description: 'GEN13',
    expiryDate: '',
    amount: '100',
    sku: 'SKU-TUN-29-SML',
    serialNumber: '#12345',
    reorderLevel: '20',
    price: '13800',
    priceMember: '13600',
    favorite: 'no',
    weight: '12',
    width: '10',
    height: '10',
    length: '10',
  },
  {
    id: '2',
    name: 'Salmon',
    type: 'CPU-GEN13-1700',
    brand: 'INTEL',
    branch: '1',
    description: '',
    expiryDate: '',
    amount: '110',
    sku: '',
    serialNumber: '',
    reorderLevel: '',
    price: '189',
    priceMember: '',
    favorite: '',
    weight: '',
    width: '',
    height: '',
    length: '',
  },
]

export const dataTemplateCsv2 = [
  {
    id: '-1 example pls remove',
    name: 'required Tuna',
    type: 'required CatFOOD add type first! use same name',
    brand: 'required add brand first! use same name',
    description: 'not required',
    expiryDate: 'not required dd-mm-yyyy',
    amount: 'required 110 (unit)',
    sku: 'not required SKU-TUN-123-SML',
    reorderLevel: 'not required 20 (unit)',
    price: 'required 199 (฿)',
    priceMember: 'not required 189 (฿)',
    favorite: 'not required true(1)/false(0)',
    weight: 'not required 12 (kg)',
    width: 'not required 12 (cm)',
    height: 'not required 12(cm)',
    length: 'not required 12(cm)',
  },
  {
    id: '0 example pls remove',
    name: 'required field example',
    type: 'CatFood',
    brand: 'Hills',
    description: '',
    expiryDate: '',
    amount: 110,
    sku: '',
    reorderLevel: '',
    price: 189,
    priceMember: '',
    favorite: '',
    weight: '',
    width: '',
    height: '',
    length: '',
  },
  {
    id: 1,
    name: 'Example',
    type: 'CatFood',
    brand: 'Hills',
    description: 'tuna kitten',
    expiryDate: '12-03-2029',
    amount: 110,
    sku: 'CAT-FOD-111-KID',
    reorderLevel: 10,
    price: 189,
    priceMember: 179,
    favorite: 1,
    weight: 12,
    width: 12,
    height: 12,
    length: 12,
  },
]
