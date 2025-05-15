import { IDataTemplateCsv, IDataTemplateCsvValidate } from '@/constant/csvData'

export interface ICompleteValues {
  name: string
  data: IDataTemplateCsv[]
}
export interface IValidatedValues {
  name: string
  validData: IDataTemplateCsvValidate[]
  inValidData: IDataTemplateCsvValidate[]
}
