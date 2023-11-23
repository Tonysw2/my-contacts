import { useState } from 'react'

type ErrorType = {
  field: string
  message: string
}

export function useErrors() {
  const [errors, setErrors] = useState<ErrorType[]>([])

  function setError({ field, message }: ErrorType) {
    const errorAlreadyExists = errors.find((error) => error.field === field)

    if (errorAlreadyExists) {
      return
    }

    setErrors((state) => [...state, { field, message }])
  }

  function removeError(field: string) {
    setErrors((state) => state.filter((error) => error.field !== field))
  }

  function getErrorMessageByFiled(field: string) {
    return errors.find((error) => error.field === field)?.message
  }

  return { errors, setError, removeError, getErrorMessageByFiled }
}
