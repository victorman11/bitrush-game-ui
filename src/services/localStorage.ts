interface LocalStorageLibrary {
  get<T>(key: string): T | null
  set<T>(key: string, value: T): void
}

class LocalStorageService implements LocalStorageLibrary {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key)

    if (!item) {
      return null
    }

    try {
      return JSON.parse(item) as T
    } catch (error) {
      return item as T
    }
  }

  set<T>(key: string, value: T) {
    if (typeof value === 'string') {
      localStorage.setItem(key, value as string)
      return
    }

    const data = JSON.stringify(value)
    localStorage.setItem(key, data)
  }

  clear() {
    localStorage.clear()
  }
}

export default LocalStorageService
