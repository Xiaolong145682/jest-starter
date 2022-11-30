const objToSearchStr = (obj: Record<string, string | number>): string =>  {
  const strArr: string[] = []
  Object.keys(obj).forEach(key => {
    strArr.push(`${key}=${obj[key]}`)
  })
  return strArr.join('&')
}

export default objToSearchStr