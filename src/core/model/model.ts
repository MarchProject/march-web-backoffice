import { dateFormat, dateTimeNoSecFormat, timeZone } from '../common'
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
      true,
    )
  }
  //

  protected setLocalDateTime<T>(
    instance: T,
    fieldName: string,
    formattedFieldName: string,
    value: string,
    time?: boolean,
  ) {
    //
    instance[fieldName] = value
    console.log({ time })
    //
    if (value) {
      instance[formattedFieldName] = dayjs(value)
        .tz(timeZone)
        .format(time ? dateTimeNoSecFormat : dateFormat)
      // moment(value)
      //   .tz(timezone)
      //   .format(dateTimeFormat)
    }
  }
}
