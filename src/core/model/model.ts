import { dateFormat, timeZone } from '../common'
import dayjs from '../common/dayjs'

export class Model {
  get key() {
    return this.id
  }
  id: string
  createdBy: string
  updatedBy: string

  //
  _createdAt: string
  formattedCreatedAt: string
  get createdAt() {
    return this._createdAt
  }
  set createdAt(value: string) {
    this.setLocalDateTime<Model>(
      this,
      '_createdAt',
      'formattedCreatedAt',
      value,
    )
  }
  _updatedAt: string
  formattedUpdatedAt: string
  get updatedAt() {
    return this._updatedAt
  }
  set updatedAt(value: string) {
    this.setLocalDateTime<Model>(
      this,
      '_updatedAt',
      'formattedUpdatedAt',
      value,
    )
  }
  //

  protected setLocalDateTime<T>(
    instance: T,
    fieldName: string,
    formattedFieldName: string,
    value: string,
  ) {
    //
    instance[fieldName] = value

    //
    if (value) {
      instance[formattedFieldName] = dayjs(value)
        .tz(timeZone)
        .format(dateFormat)
      // moment(value)
      //   .tz(timezone)
      //   .format(dateTimeFormat)
    }
  }
}
