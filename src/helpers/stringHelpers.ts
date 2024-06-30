const capitalize = (str: string) =>
  str.replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase())

function cut(inputString: string, lengthToRemove: number = 5) {
  if (typeof inputString !== 'string') {
    throw new Error('Input must be a string.')
  }

  if (lengthToRemove <= 0 || lengthToRemove >= inputString.length) {
    return inputString
  }

  const startLength = Math.floor((inputString.length - lengthToRemove) / 2)
  const endLength = inputString.length - startLength - lengthToRemove

  const result =
    inputString.slice(0, startLength) + '...' + inputString.slice(-endLength)

  return result
}

function addEllipses(value: string, size: number = 5) {
  if (value) {
    const suffixSize = size - 1
    return `${value.slice(0, size)}...${value.slice(value.length - suffixSize, value.length)}`
  }
  return value
}

export { addEllipses, capitalize, cut }
