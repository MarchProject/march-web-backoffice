import { gql } from '@apollo/client'

export type GetInventoriesData = {
  getInventories: InventoriesResponse
}

export type InventoriesResponse = {
  inventories: InventoriesData[]
  pageNo: number
  pageLimit: number
  totalPage: number
  totalRow: number
}

export type InventoriesData = {
  id: string
  name: string
  amount: number
  inventoryType: {
    name: string
  }
  brandType: {
    name: string
  }
  description: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}

export type IFavoriteStatus = 'LIKE' | 'DEFAULT'

export type GetInventoriesVariables = {
  params: {
    search?: string
    limit?: number
    type?: string[]
    favorite?: IFavoriteStatus
    brand?: string[]
    pageNo?: number
  }
}

export const getInventoryQuery = gql`
  query getInventory($id: String) {
    getInventory(id: $id) {
      id
      name
      amount
      sold
      price
      sku
      size
      favorite
      priceMember
      reorderLevel
      inventoryType {
        id
        name
      }
      brandType {
        id
        name
      }
      description
      expiryDate
      createdBy
      createdAt
      updatedBy
      updatedAt
    }
  }
`

export const getInventoriesQuery = gql`
  query getInventories($params: ParamsInventory!) {
    getInventories(params: $params) {
      inventories {
        id
        name
        amount
        sold
        price
        favorite
        inventoryType {
          name
        }
        brandType {
          name
        }
        description
        expiryDate
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
      pageNo
      pageLimit
      totalPage
      totalRow
    }
  }
`
export type GetInventoriesTypeData = {
  getInventoryTypes: GetInventoryTypes[]
}

export type GetInventoryTypes = {
  id?: string
  name: string
  _name?: string
  description: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}
export type GetInventoriesTypeVariables = {
  params: {
    search: string
    limit: number
    offset: number
  }
}
export const getInventoriesTypeQuery = gql`
  query getInventoryTypes($params: ParamsInventoryType!) {
    getInventoryTypes(params: $params) {
      id
      name
      description
      createdBy
      # createdAt
      updatedBy
      # updatedAt
    }
  }
`

export type GetInventoriesBrandData = {
  getBrandTypes: GetInventoryBrand[]
}

export type GetInventoryBrand = {
  id: string
  name: string
  description: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}
export type GetInventoriesBrandVariables = {
  params: {
    search: string
    limit: number
    offset: number
  }
}

export const getInventoriesBrandQuery = gql`
  query getBrandTypes($params: ParamsInventoryBrand!) {
    getBrandTypes(params: $params) {
      id
      name
      description
      createdBy
      # createdAt
      updatedBy
      # updatedAt
    }
  }
`

export type UpsertInventoryData = {
  id?: string
  name: string
  amount: number
  price: number
  sku?: string
  favorite?: boolean
  size?: {
    width?: number
    length?: number
    height?: number
    weight?: number
  }
  priceMember?: number
  reorderLevel?: number
  description?: string
  createdBy?: string
  inventoryTypeId: string
  brandTypeId: string
  expiryDate?: string
}

export type UpsertInventoryTypeVariables = {
  input: UpsertInventoryData
}

export type UpsertInventoryTypeData = {
  upsertInventory: UpsertInventoryTypes
}

export type UpsertInventoryTypes = {
  id: string
}

export const upsertInventoryMutation = gql`
  mutation upsertInventory($input: UpsertInventoryInput!) {
    upsertInventory(input: $input) {
      id
    }
  }
`
export const upsertInventoryTypeMutation = gql`
  mutation upsertInventoryType($input: UpsertInventoryTypeInput!) {
    upsertInventoryType(input: $input) {
      id
    }
  }
`
export const upsertBrandTypeMutation = gql`
  mutation upsertBrandType($input: UpsertBrandTypeInput!) {
    upsertBrandType(input: $input) {
      id
    }
  }
`
export const deleteInventoryTypeMutation = gql`
  mutation deleteInventoryType($id: String!) {
    deleteInventoryType(id: $id) {
      id
    }
  }
`
export const deleteBrandTypeMutation = gql`
  mutation deleteBrandType($id: String!) {
    deleteBrandType(id: $id) {
      id
    }
  }
`
export const deleteInventoryMutation = gql`
  mutation deleteInventory($id: String!) {
    deleteInventory(id: $id) {
      id
    }
  }
`
export const favoriteInventoryMutation = gql`
  mutation favoriteInventory($id: String!) {
    favoriteInventory(id: $id) {
      id
    }
  }
`

export type FavoriteInventoryVariables = {
  id: string
}

export type FavoriteInventoryData = {
  favoriteInventory: {
    id?: string
  }
}

export type DeleteInventoryData = {
  deleteInventory: {
    id?: string
  }
}

export type DeleteTypeDataVariables = {
  id: string
}

export type UpsertInventoryBrandTypeVariables = {
  input: {
    id?: string
    name: string
    description?: string
    createdBy?: string
  }
}

export type UpsertInventoryType = {
  upsertInventoryType: {
    id?: string
  }
}

export type UpsertBrandType = {
  upsertBrandType: {
    id?: string
  }
}

export type DeleteTypeData = {
  deleteInventoryType: {
    id?: string
  }
}

export type DeleteBrandData = {
  deleteBrandType: {
    id?: string
  }
}

export type InventoryNames = {
  getInventoryNames: [
    {
      id: string
      name: string
    },
  ]
}

export const getInventoryNamesQuery = gql`
  query getInventoryNames {
    getInventoryNames {
      id
      name
    }
  }
`

// uploadInventory(input: UploadInventoryInput!): UploadInventoryResponse
export const uploadInventoryMutation = gql`
  mutation uploadInventory($input: UploadInventoryInput!) {
    uploadInventory(input: $input) {
      id
      success
      reason
    }
  }
`
export type UploadInventoryData = {
  uploadInventory: {
    id: string
    success: boolean
    reason: string
  }
}

export type UploadInventoryVariable = {
  input: {
    uploadDatas: UpsertInventoryData[]
    fileName: string
  }
}
