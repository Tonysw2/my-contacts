import { Link } from 'react-router-dom'

import { Container } from './styles'

type Props = {
  hasError: boolean
  qtyOfContacts: number
  qtyOfFilteredContacts: number
}

export function Header({
  hasError,
  qtyOfContacts,
  qtyOfFilteredContacts,
}: Props) {
  return (
    <Container
      $justifyContent={
        hasError ? 'flex-end' : qtyOfContacts > 0 ? 'space-between' : 'center'
      }
    >
      {!hasError && qtyOfContacts > 0 && (
        <strong>
          {qtyOfFilteredContacts}{' '}
          {qtyOfFilteredContacts === 1 ? 'contato' : 'contatos'}
        </strong>
      )}
      <Link to="/new">Novo contato</Link>
    </Container>
  )
}
