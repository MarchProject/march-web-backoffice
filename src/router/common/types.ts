export type PathWithParam = (param: string) => string
export type PathWithParams = (params: string[]) => string
export type Route = {
  path: string
  fullPath?: string
  prepath?: string
  postpath?: string
  pathWithParam?: PathWithParam
  pathWithParams?: PathWithParams
  auth?: boolean
  regex?: RegExp
}
