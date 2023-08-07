import React from 'react'
import { CSVLink } from 'react-csv'
import { LabelKeyObject } from 'react-csv/components/CommonPropTypes'

interface IDownLoadCsv {
  data: object[]
  headers: LabelKeyObject[]
  contents: () => JSX.Element
}

const DownLoadCsv = ({ data, headers, contents }: IDownLoadCsv) => {
  return (
    <CSVLink
      id="csv-download"
      className="!no-underline"
      filename="Template_CSV_Upload_Item.csv"
      data={data}
      target="_blank"
      headers={headers}>
      {contents()}
    </CSVLink>
  )
}

export default DownLoadCsv
