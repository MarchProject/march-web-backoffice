import * as url from 'url'

export function getPathParams(pattern: RegExp, _url: string) {
  const parsedUrl = url.parse(_url, true)
  const [path, first, second, third] = parsedUrl.pathname.match(pattern) ?? []

  return [
    first ? first.replace('/', '').replace('.json', '') : '',
    second ? second.replace('/', '').replace('.json', '') : '',
    third ? third.replace('/', '').replace('.json', '') : '',
    path,
  ]
}
