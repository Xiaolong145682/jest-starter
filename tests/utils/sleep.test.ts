import sleep from "@/utils/sleep";

describe('sleep', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('可以睡眠 1000ms', async () => {
    const callback = jest.fn()

    const act = async (callback: () => void) => {
      await sleep(1000)
      callback();
    }

    const promise = act(callback)

    expect(callback).not.toHaveBeenCalled()

    jest.runAllTimers()

    await promise

    expect(callback).toHaveBeenCalledTimes(1)
  })
})