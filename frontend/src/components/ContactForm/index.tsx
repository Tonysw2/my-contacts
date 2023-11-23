import { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '../Button'
import { FormGroup } from '../FormGroup'
import { Input } from '../Input'
import { Select } from '../Select'
import { ButtonContainer, Form } from './styles'
import { isEmailValid } from '../../utils/isEmailValid'
import { useErrors } from '../../hooks/useErrors'
import { formatPhone } from '../../utils/formatPhone'

type Props = {
  buttonLabel: string
}

export function ContactForm({ buttonLabel }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('')
  const { errors, setError, removeError, getErrorMessageByFiled } = useErrors()
  console.log(errors)

  const isFormValid = name && errors.length === 0

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

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    console.log({ event, name, email, phone, category })
  }

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
    >
      <FormGroup errorMessage={getErrorMessageByFiled('name')}>
        <Input
          value={name}
          variant="default"
          placeholder="Nome *"
          onChange={handleNameChange}
          error={!!getErrorMessageByFiled('name')}
        />
      </FormGroup>

      <FormGroup errorMessage={getErrorMessageByFiled('email')}>
        <Input
          type="email"
          value={email}
          variant="default"
          placeholder="E-mail"
          onChange={handleEmailChange}
          error={!!getErrorMessageByFiled('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="tel"
          value={phone}
          variant="default"
          placeholder="Telefone"
          onChange={handlePhoneChange}
          maxLength={15}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          placeholder="Categoria"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="instagram">Instagram</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  )
}
