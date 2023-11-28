import { forwardRef } from 'react'

import { FormDataType } from '../../pages/NewContact/useNewContact'
import { Button } from '../Button'
import { FormGroup } from '../FormGroup'
import { Input } from '../Input'
import { Select } from '../Select'
import { Spinner } from '../Spinner'

import { ContactDTO } from '../../dtos/ContactDTO'

import { ButtonContainer, Form } from './styles'
import { useContactForm } from './useContactForm'

export type ContactFormRef = {
  setCurrentFieldValues: (contact: ContactDTO) => void
  resetFields: () => void
}

type Props = {
  buttonLabel: string
  onSubmit: (formData: FormDataType) => Promise<void>
}

export const ContactForm = forwardRef<ContactFormRef, Props>(
  function ContactForm({ onSubmit, buttonLabel }, ref) {
    const {
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
    } = useContactForm(ref, onSubmit)

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
            onChange={handleCategoryChange}
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
  },
)
