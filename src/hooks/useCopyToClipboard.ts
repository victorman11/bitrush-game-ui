import { useCallback, useState } from 'react'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>

type UseCopyToClipboard = {
  text: string | null
  copy: CopyFn
}

export function useCopyToClipboard(): UseCopyToClipboard {
  const [text, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }, [])

  return { text, copy }
}
