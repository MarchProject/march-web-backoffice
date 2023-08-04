import { errorMarch } from './ErrorType'

export const errorTextTranform = (error: string) => {
  switch (error) {
    case errorMarch.EnumErrorType.BAD_HAVE_TYPE: {
      return 'Already use in product'
    }
    case errorMarch.EnumErrorType.INTERNAL_ERROR: {
      return 'Internal error'
    }
    case errorMarch.EnumErrorType.UNAUTHORIZED_SHOPID: {
      return 'Unauthorized shop'
    }
    case errorMarch.EnumErrorType.BAD_REQUEST: {
      return 'Bad request'
    }
    case errorMarch.EnumErrorType.DUPLICATED_NAME: {
      return 'Duplicated name'
    }
    case errorMarch.EnumErrorType.BAD_REQUEST_REQUIRED: {
      return 'Bad request required'
    }
    case errorMarch.EnumErrorType.PERMISSION: {
      return 'Permission'
    }
    case errorMarch.EnumErrorType.UNAUTHORIZED_ROLE: {
      return 'Unauthorized role'
    }
    case errorMarch.EnumErrorType.UNAUTHORIZED_DEVICE: {
      return 'Unauthorized device'
    }
    default: {
      return 'error'
    }
  }
}
