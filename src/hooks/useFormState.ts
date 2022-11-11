import { FormEventHandler, useCallback, useState } from 'react'
import { useRenewableRef } from './useRenewableRef'

export function useFormState<T>(initialState: T) {
  const [formState, setFormState] = useState<T>(initialState)
  const formStateRef = useRenewableRef(formState)

  const onChange: FormEventHandler<HTMLFormElement> = useCallback(
    event => {
      const target = event.target as HTMLInputElement
      const newFormState = {
        ...formStateRef.current,
        [target.name]: target.value,
      }
      setFormState(newFormState)
    },
    [formStateRef],
  )

  return { formState, onChange }
}
