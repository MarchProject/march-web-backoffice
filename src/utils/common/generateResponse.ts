import { validate as uuidValidate } from 'uuid'
interface PagePayload {
  [key: string]: string[]
}

export const generateMenuResponse = (page: PagePayload): string[] => {
  const response: string[] = []

  for (const menu in page) {
    for (const action of page[menu]) {
      response.push(`${menu}:${action}`)
    }
  }

  return response
}

export const generatePathResponse = (path: string) => {
  const pathS = path.split('/')
  const _path = pathS.map((p) => {
    if (uuidValidate(p)) {
      return ':Id'
    } else {
      return p
    }
  })
  return _path.join('/')
}
