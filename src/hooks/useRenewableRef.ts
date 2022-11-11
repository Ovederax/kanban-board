import { useRef } from 'react'

export interface RenewRefObject<T> {
  current: T
}

/* Inside this ref always placed current value */
export const useRenewableRef = <T>(current: T): RenewRefObject<T> => {
  const propsRef = useRef<T>(current)
  propsRef.current = current // Renew property
  return propsRef
}
