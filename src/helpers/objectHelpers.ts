export const entries = <T extends object>(obj: T) =>
  Object.entries(obj) as Array<[keyof T, T[keyof T]]>

export const keys = <T extends object>(obj: T) =>
  Object.keys(obj) as Array<keyof T>

export const values = <T extends object>(obj: T) =>
  Object.values(obj) as Array<T[keyof T]>

export const objectsAreEqual = <T extends object>(
  obj1: T,
  obj2: T,
): boolean => {
  const keys1 = Object.keys(obj1) as (keyof T)[]
  const keys2 = Object.keys(obj2) as (keyof T)[]

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!(key in obj2) || obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true
}
