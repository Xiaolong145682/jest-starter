import storage from "@/utils/storage";

describe('storage', () => {
  it('可以缓存值', () => {
    storage.set('newKey', 'hello')
    expect(localStorage.getItem('jest-app-newKey')).toEqual("hello")
  })

  it('可以读取值', () => {
    localStorage.setItem('jest-app-newKey', 'hello')
    expect(storage.get('newKey')).toEqual('hello')
  })
})