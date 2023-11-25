import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { CategoryDTO } from '../../dtos/CategoryDTO'
import { ContactDTO } from '../../dtos/ContactDTO'
import { useErrors } from '../../hooks/useErrors'
import CategoriesService from '../../services/CategoriesService'
import { formatPhone } from '../../utils/formatPhone'
import { isEmailValid } from '../../utils/isEmailValid'
import { Button } from '../Button'
import { FormGroup } from '../FormGroup'
import { Input } from '../Input'
import { Select } from '../Select'
import { Spinner } from '../Spinner'
import { ButtonContainer, Form } from './styles'

type Props = {
  buttonLabel: string
  onSubmit: (
    formData: Omit<ContactDTO, 'id' | 'category_name'>,
  ) => Promise<void>
}

export function ContactForm({ buttonLabel, onSubmit }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const { errors, setError, removeError, getErrorMessageByFiled } = useErrors()

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      setIsLoadingCategories(true)
      const categoriesList = await CategoriesService.listCategories()
      setCategories(categoriesList)
    } catch {
    } finally {
      setIsLoadingCategories(false)
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    await onSubmit({ name, email, phone, category_id: categoryId })
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

  const isFormValid = name && errors.length === 0

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormGroup errorMessage={getErrorMessageByFiled('name')}>
        <Input
          value={name}
          $variant="default"
          placeholder="Nome *"
          onChange={handleNameChange}
          disabled={isSubmitting}
          $error={!!getErrorMessageByFiled('name')}
        />
      </FormGroup>

      <FormGroup errorMessage={getErrorMessageByFiled('email')}>
        <Input
          type="email"
          value={email}
          $variant="default"
          placeholder="E-mail"
          disabled={isSubmitting}
          onChange={handleEmailChange}
          $error={!!getErrorMessageByFiled('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="tel"
          value={phone}
          $variant="default"
          placeholder="Telefone"
          disabled={isSubmitting}
          onChange={handlePhoneChange}
          maxLength={15}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          placeholder="Categoria"
          disabled={isLoadingCategories || isSubmitting}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid || isSubmitting}>
          {!isSubmitting && buttonLabel}
          {isSubmitting && <Spinner $size={16} />}
        </Button>
      </ButtonContainer>
    </Form>
  )
}
