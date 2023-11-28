import { ContactForm } from '../../components/ContactForm'
import { PageHeader } from '../../components/PageHeader'

import { useNewContact } from './useNewContact'

export function NewContact() {
  const { contactFormRef, handleSubmit } = useNewContact()

  return (
    <div>
      <PageHeader title="Novo contato" />
      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar"
      />
    </div>
  )
}
