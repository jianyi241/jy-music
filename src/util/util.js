/**
 * 工具
 */
export const setStore = (name, value) => {
    if (!value) return
    if (typeof value !== 'string') {
    value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
}

export const getStore = (name) => {
  if (!name) return
  return window.localStorage.getItem(name)
}

export const removeStore = (name) => {
  window.localStorage.removeItem(name)
}
