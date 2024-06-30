import { RefObject, useEffect } from 'react'

export function useOutsideClickAlerter(
  ref: RefObject<HTMLElement>,
  onOutsideClick: () => void,
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onOutsideClick])
}
