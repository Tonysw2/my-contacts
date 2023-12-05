import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import CategoriesService from '../../services/CategoriesService'

import { formatPhone } from '../../utils/formatPhone'
import { isEmailValid } from '../../utils/isEmailValid'

import { ContactDTO } from '../../dtos/ContactDTO'
import { CategoryDTO } from '../../dtos/CategoryDTO'

import { useErrors } from '../../hooks/useErrors'

import { FormDataType } from '../../pages/NewContact/useNewContact'
import { ContactFormRef } from '.'

export function useContactForm(
  ref: React.ForwardedRef<ContactFormRef>,
  onSubmit: (formData: FormDataType) => Promise<void>,
) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const { errors, setError, removeError, getErrorMessageByFiled } = useErrors()

  useImperativeHandle(
    ref,
    () => ({
      setCurrentFieldValues(contact: ContactDTO) {
        setName(contact.name ?? '')
        setEmail(contact.email ?? '')
        setPhone(formatPhone(contact.phone) ?? '')
        setCategoryId(contact.category.id ?? '')
      },

      resetFields() {
        setName('')
        setEmail('')
        setPhone('')
        setCategoryId('')
      },
    }),
    [],
  )

  useEffect(() => {
    const controller = new AbortController()

    loadCategories(controller.signal)

    return () => {
      controller.abort()
    }
  }, [])

  async function loadCategories(signal: AbortSignal) {
    try {
      setIsLoadingCategories(true)
      const categoriesList = await CategoriesService.listCategories(signal)
      setCategories(categoriesList)
    } catch {
    } finally {
      setIsLoadingCategories(false)
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setIsSubmitting(true)
    await onSubmit({ name, email, phone, categoryId })
    setIsSubmitting(false)
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)

    if (!event.target.value) {
      setError({ field: 'name', message: 'O nome é obrigatório' })
    } else {
      removeError('name')
    }
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' })
    } else {
      removeError('email')
    }
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value))
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setCategoryId(event.target.value)
  }

  const isFormValid = name && errors.length === 0

  return {
    name,
    email,
    phone,
    categories,
    categoryId,
    isFormValid,
    isSubmitting,
    isLoadingCategories,
    handleSubmit,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleCategoryChange,
    getErrorMessageByFiled,
  }
}
