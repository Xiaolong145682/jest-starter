const KET_NAME = 'jest-app-'

const set = (key: string, value: string) => {
  localStorage.setItem(KET_NAME + key, value)
}

const get = (key: string) => {
  return localStorage.getItem(KET_NAME + key)
}

const storage = {
  set,
  get,
}

export default storage