// Capitalize text filter
export const capitalize = (text = '') => {
  return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

// Flatten array to a list
export const flattenArray = (array) => {
  return array.join(', ')
}

// Flatten array to a list
export const flattenArrayMultiline = (array) => {
  return array.join(', \n')
}

// Local storage
export const readLocalStorage = (localName) => {
  return JSON.parse(localStorage.getItem(localName))
}

export const updateLocalStorage = (data, localName) => {
  localStorage.setItem(localName, JSON.stringify(data))
}

export const clearLocalStorage = (localName) => {
  localStorage.removeItem(localName)
}
