export interface ResponseData<T> {
  data: T
  status: {
    code: number
    message: string
  }
}

export enum StatusCode {
  SUCCESS = 1000,
  ONUSE = 9004,
}
