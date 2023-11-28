import { useCallback, useState } from 'react'

type ErrorType = {
  field: string
  message: string
}

export function useErrors() {
  const [errors, setErrors] = useState<ErrorType[]>([])

  const setError = useCallback(
    ({ field, message }: ErrorType) => {
      const errorAlreadyExists = errors.find((error) => error.field === field)

      if (errorAlreadyExists) {
        return
      }

      setErrors((state) => [...state, { field, message }])
    },
    [errors],
  )

  const removeError = useCallback((field: string) => {
    setErrors((state) => state.filter((error) => error.field !== field))
  }, [])

  const getErrorMessageByFiled = useCallback(
    (field: string) => {
      return errors.find((error) => error.field === field)?.message
    },
    [errors],
  )

  return { errors, setError, removeError, getErrorMessageByFiled }
}
