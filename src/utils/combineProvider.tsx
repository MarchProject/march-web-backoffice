import { ReactElement } from 'react'

interface ICombineProviders {
  children: ReactElement
  providers: any[]
}

const combineProviders = ({ providers, children }: ICombineProviders) => {
  return providers.reduceRight((accum, Provider) => {
    return <Provider>{accum}</Provider>
  }, children)
}

export default combineProviders
