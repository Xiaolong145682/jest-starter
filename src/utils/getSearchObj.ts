const getSearchObj = () => {
  return Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  )
}

export default getSearchObj
